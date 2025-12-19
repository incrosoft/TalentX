import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export const listTasks = async (req: AuthRequest, res: Response) => {
    const { project_id } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: project_id ? { projectId: project_id as string } : {},
            include: {
                assignee: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTask = async (req: AuthRequest, res: Response) => {
    const { project_id, title, description, status, priority, due_date, assignee_id } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                projectId: project_id,
                title,
                description,
                status: status || 'todo',
                priority: priority || 'medium',
                due_date: due_date ? new Date(due_date) : null,
                assigneeId: assignee_id,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.due_date) {
            data.due_date = new Date(data.due_date);
        }
        const task = await prisma.task.update({
            where: { id },
            data,
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
