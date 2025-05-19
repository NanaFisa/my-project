import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Params } from 'next/dist/server/request/params';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = Number(params.id);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [taskId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch task',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const taskId = Number(params.id);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const { title, description, status } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      `UPDATE tasks SET title = $1, description = $2, status = $3, "updatedAt" = NOW() WHERE id = $4 RETURNING *`,
      [title, description || null, status || 'pending', taskId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Update Task Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update task',
        details: error instanceof Error ? error.message : 'Database error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string} }
) {
  try {
    const taskId = Number(params.id);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { success: false,
          message: 'Invalid task ID',
          id: params.id },
        { status: 400 }
      );
    }

    const { rows: [task] } = await pool.query(
      'SELECT * FROM tasks WHERE id = $1', [taskId]
    );

    if (!task) {
      return NextResponse.json({
        success: false,
        message: 'Task not found',
        id: taskId
      },
    { status: 404 }
  );
    }

    const { rowCount } = await pool.query(
      'DELETE FROM tasks WHERE id = $1',
      [taskId]
    );

    if (rowCount === 0) {
      return NextResponse.json(
        { success: false,
          message: 'Failed to delete task',
          id: taskId },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
      id: taskId,
      data: task
    },
  { status: 200 }
  );

  } catch (error) {
    console.error('Delete Task Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete task',
        details: error instanceof Error ? error.message : 'Database error',
        id: params.id
      },
      { status: 500 }
    );
  }
}