import { NextResponse } from "next/server";

interface Task {
    task_id: number,
    description: string,
    completed: boolean
}

let Tasks: Task[] = [
    {
        task_id: 1,
        description: "learn nextJs",
        completed: true
    },
    {
        task_id: 2,
        description: "Learn supabase",
        completed: false
    }
]

export function GET(req: Request, { params }: { params: { user_id: string } }) {
    const { user_id } = params;
    return NextResponse.json(Tasks)
}