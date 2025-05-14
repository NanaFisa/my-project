import pool from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(rows[0]);

        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch task' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete task' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}