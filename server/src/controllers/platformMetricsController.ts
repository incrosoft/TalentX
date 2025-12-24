import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from "../middleware/auth";

export const getMetrics = async (req: AuthRequest, res: Response) => {
    try {
        // getting the first metrics record
        let metrics = await prisma.platformMetrics.findFirst();

        if (!metrics) {
            metrics = await prisma.platformMetrics.create({
                data: {
                    clients_served: 0,
                    industries_served: 0,
                    total_global_talent: 0,
                    countries_served: 0,
                    success_rate: 0,
                    years_experience: 0,
                },
            });
        }

        res.json(metrics);
    } catch (error: any) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const updateMetrics = async (req: AuthRequest, res: Response) => {
    try {
        const {
            clients_served,
            industries_served,
            total_global_talent,
            countries_served,
            success_rate,
            years_experience,
        } = req.body;

        // fetching all metric rows
        const metricsRows = await prisma.platformMetrics.findMany();

        let metrics;

        if (metricsRows.length === 0) {
            metrics = await prisma.platformMetrics.create({
                data: {
                    clients_served: clients_served || 0,
                    industries_served: industries_served || 0,
                    total_global_talent: total_global_talent || 0,
                    countries_served: countries_served || 0,
                    success_rate: success_rate || 0,
                    years_experience: years_experience || 0,
                },
            });
        } else {
            if (metricsRows.length > 1) {
                console.warn(
                    "Multiple platform metrics rows exist! Using the first one. Consider cleaning duplicates."
                );
            }

            // Updating the row
            metrics = await prisma.platformMetrics.update({
                where: { id: metricsRows[0].id },
                data: {
                    ...(clients_served !== undefined && { clients_served }),
                    ...(industries_served !== undefined && { industries_served }),
                    ...(total_global_talent !== undefined && { total_global_talent }),
                    ...(countries_served !== undefined && { countries_served }),
                    ...(success_rate !== undefined && { success_rate }),
                    ...(years_experience !== undefined && { years_experience }),
                },
            });
        }

        return res.json({
            success: true,
            message: "Platform metrics updated successfully",
            data: metrics,
        });
    } catch (error: any) {
        console.error("Error updating metrics:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
