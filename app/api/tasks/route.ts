import pool from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch tasks'});
        }
    } else if (req.method === 'POST') {
        try {
            const { title, description, status } = req.body;
            const { rows } = await pool.query('INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', [ title, description, status ]);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create task'});
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}