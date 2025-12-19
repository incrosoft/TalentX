import { Request, Response } from 'express';
import { prisma } from '../index';

export const createHireRequest = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const hireRequest = await prisma.hireRequest.create({
            data: {
                client_name: data.client_name,
                client_email: data.client_email,
                company_name: data.company_name,
                hire_type: data.hire_type,
                category: data.category,
                project_description: data.project_description,
                budget: data.budget,
                timeline: data.timeline,
                status: 'pending',
            },
        });

        res.status(201).json(hireRequest);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const listHireRequests = async (req: Request, res: Response) => {
    try {
        const hireRequests = await prisma.hireRequest.findMany();
        res.json(hireRequests);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
