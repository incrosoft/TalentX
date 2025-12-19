import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export const listMessages = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        const formattedMessages = messages.map((m) => ({
            ...m,
            sender_name: m.sender.full_name,
            sender_avatar: m.sender.avatar_url,
        }));

        res.json(formattedMessages);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createMessage = async (req: AuthRequest, res: Response) => {
    const senderId = req.user?.id;
    const { receiver_id, content } = req.body;
    try {
        const message = await prisma.message.create({
            data: {
                senderId: senderId!,
                receiverId: receiver_id,
                content,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        const formattedMessage = {
            ...message,
            sender_name: message.sender.full_name,
            sender_avatar: message.sender.avatar_url,
        };

        res.status(201).json(formattedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
