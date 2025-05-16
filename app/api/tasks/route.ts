import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    console.log('=== GET /api/tasks ===');
    try {
        console.log('Attempting to fetch tasks...');
        const { rows } = await pool.query(
            'SELECT * FROM tasks ORDER BY "createdAt" DESC'
        );
        console.log('Fetched tasks:', rows.length);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks',
              details: error instanceof Error ? error.message : 'Unknown error'  
             },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, status } = await request.json();

        if (!title) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        const { rows } = await pool.query(
            'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', [title, description || null , status || 'pending']
        );

        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        console.error('Create Task Error:', error);
        return NextResponse.json( 
            { error: 'Failed to create task'},
            { status: 500 }
        );
    }
}