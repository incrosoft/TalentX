import { Response } from "express";
import { prisma } from "../index";
import { AuthRequest } from "../middleware/auth";

export const listProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    let projects;

    if (role === "admin") {
      projects = await prisma.project.findMany({
        include: {
          talent: { include: { user: true } },
          team: true,
          agency: { include: { user: true } },
        },
      });
    } else if (role === "talent") {
      const talent = await prisma.talent.findUnique({ where: { userId } });
      projects = await prisma.project.findMany({
        where: { talentId: talent?.id },
        include: {
          talent: { include: { user: true } },
          team: true,
          agency: { include: { user: true } },
        },
      });
    } else {
      // Client
      projects = await prisma.project.findMany({
        where: { clientId: userId },
        include: {
          talent: { include: { user: true } },
          team: true,
          agency: { include: { user: true } },
        },
      });
    }

    const formattedProjects = projects.map((p) => ({
      ...p,
      assigned_to: p.talent
        ? {
            id: p.talent.id,
            name: p.talent.user.full_name,
            type: "talent",
            image_url: p.talent.user.avatar_url,
          }
        : p.team
        ? {
            id: p.team.id,
            name: p.team.team_name,
            type: "team",
            image_url: p.team.image_url,
          }
        : p.agency
        ? {
            id: p.agency.id,
            name: p.agency.agency_name,
            type: "agency",
            image_url: p.agency.user.avatar_url,
          }
        : undefined,
    }));

    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        talent: { include: { user: true } },
        team: true,
        agency: { include: { user: true } },
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const formattedProject = {
      ...project,
      assigned_to: project.talent
        ? {
            id: project.talent.id,
            name: project.talent.user.full_name,
            type: "talent",
            image_url: project.talent.user.avatar_url,
          }
        : project.team
        ? {
            id: project.team.id,
            name: project.team.team_name,
            type: "team",
            image_url: project.team.image_url,
          }
        : project.agency
        ? {
            id: project.agency.id,
            name: project.agency.agency_name,
            type: "agency",
            image_url: project.agency.user.avatar_url,
          }
        : undefined,
    };

    res.json(formattedProject);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  console.log("Received createProject request:", req.body);
  try {
    const {
      name,
      description,
      status,
      progress,
      budget_spent,
      total_budget,
      next_milestone,
    } = req.body;
    const client_email = req.body.client_email || req.user?.email;
    const clientId = req.body.clientId || req.user?.id;

    if (!client_email || !clientId) {
      return res
        .status(400)
        .json({ message: "Client email and ID are required" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        client_email,
        clientId,
        status: status || "active",
        progress: progress || 0,
        budget_spent: budget_spent || 0,
        total_budget: total_budget ? parseFloat(total_budget) : undefined,
        next_milestone,
      } as any,
    });
    res.status(201).json(project);
  } catch (error: any) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });
    res.json(project);
  } catch (error: any) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
