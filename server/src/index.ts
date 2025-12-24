import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/authRoutes';
import talentRoutes from './routes/talentRoutes';
import agencyRoutes from './routes/agencyRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import messageRoutes from './routes/messageRoutes';
import hireRequestRoutes from './routes/hireRequestRoutes';
import platformMetricsRoutes from './routes/platformMetricsRoutes';
import testimonialRoutes from './routes/testimonialRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/talents', talentRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/hire-requests', hireRequestRoutes);
app.use('/api/platform-metrics', platformMetricsRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { app, prisma };
