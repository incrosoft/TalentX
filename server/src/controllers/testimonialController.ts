import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from "../middleware/auth";

export const getApprovedAndPublishedTestimonials = async (req: AuthRequest, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                status: 'approved',
                is_published: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching published testimonials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllTestimonials = async (req: AuthRequest, res: Response) => {
    const { status, is_published } = req.query;

    try {
        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (is_published !== undefined) {
            where.is_published = is_published === 'true';
        }

        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching all testimonials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTestimonial = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json(testimonial);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTestimonial = async (req: AuthRequest, res: Response) => {
    const {
        client_name,
        company,
        position,
        content,
        rating,
        avatar_url,
        status,
    } = req.body;

    if (!client_name || !content) {
        return res.status(400).json({ message: 'Client name and content are required' });
    }

    if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const testimonial = await prisma.testimonial.create({
            data: {
                client_name,
                company,
                position,
                content,
                rating: rating || 5,
                avatar_url,
                status: status || 'pending',
            },
        });

        res.status(201).json(testimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTestimonial = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const {
        client_name,
        company,
        position,
        content,
        rating,
        avatar_url,
    } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                ...(client_name && { client_name }),
                ...(company !== undefined && { company }),
                ...(position !== undefined && { position }),
                ...(content && { content }),
                ...(rating && { rating }),
                ...(avatar_url !== undefined && { avatar_url }),
            },
        });

        res.json(testimonial);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        console.error('Error updating testimonial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const approveTestimonial = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { approved } = req.body;

    try {
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                status: approved === false ? 'rejected' : 'approved',
            },
        });

        res.json(testimonial);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        console.error('Error approving testimonial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const togglePublish = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { is_published } = req.body;

    if (is_published === undefined) {
        return res.status(400).json({ message: 'is_published field is required' });
    }

    try {
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                is_published,
            },
        });

        res.json(testimonial);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        console.error('Error toggling publish status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTestimonial = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.testimonial.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
