import { Request, Response } from 'express';
import { prisma } from '../index';;
/**
 * Returns a list of agencies with selected linked user info.
 * */
export const listAgencies = async (req: Request, res: Response) => {
    try {
        const agencies = await prisma.agency.findMany({
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });

        const formattedAgencies = agencies.map((a:any) => ({ // error: Parameter a implicitly has an any type. fix: added any type to Parameter a.
            ...a,
            services: JSON.parse(a.services || '[]'),
            industry_focus: JSON.parse(a.industry_focus || '[]'),
            coordinates: a.lat && a.lng ? { lat: a.lat, lng: a.lng } : undefined,
        }));

        res.json(formattedAgencies);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAgency = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const agency = await prisma.agency.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });

        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }

        const formattedAgency = {
            ...agency,
            services: JSON.parse(agency.services || '[]'),
            industry_focus: JSON.parse(agency.industry_focus || '[]'),
            coordinates: agency.lat && agency.lng ? { lat: agency.lat, lng: agency.lng } : undefined,
        };

        res.json(formattedAgency);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
