import { Request, Response } from 'express';
import { prisma } from '../index';

export const listTeams = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    include: {
                        talent: {
                            include: {
                                user: {
                                    select: {
                                        full_name: true,
                                        avatar_url: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const formattedTeams = teams.map((t) => ({
            ...t,
            members: t.members.map((m) => ({
                name: m.talent.user.full_name,
                role: m.role,
                image_url: m.talent.user.avatar_url,
            })),
            coordinates: t.lat && t.lng ? { lat: t.lat, lng: t.lng } : undefined,
        }));

        res.json(formattedTeams);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.findUnique({
            where: { id },
            include: {
                members: {
                    include: {
                        talent: {
                            include: {
                                user: {
                                    select: {
                                        full_name: true,
                                        avatar_url: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const formattedTeam = {
            ...team,
            members: team.members.map((m) => ({
                name: m.talent.user.full_name,
                role: m.role,
                image_url: m.talent.user.avatar_url,
            })),
            coordinates: team.lat && team.lng ? { lat: team.lat, lng: team.lng } : undefined,
        };

        res.json(formattedTeam);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
