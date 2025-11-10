"use client";

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';


interface Task {
    task_id: string,
    description: string,
    completed: boolean
}

export default function Tasks() {
    const { user } = useAuth()
    const [taskList, setTaskList] = useState<Task[]>([])
    const router = useRouter()

    const fetchData = useCallback(async () => {
        const { data, error } = await supabase.from("tasks").select("*");
        if (error) {
            alert("can't retrieve data")
            return
        }
        setTaskList(data)
    }, [])

    useEffect(() => {
        const loadTasks = async () => fetchData()
        if (user) {
            loadTasks()
        }
    }, [user, fetchData])

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);


    const deleteTask = async (task_id: string) => {
        await supabase.from("tasks").delete().eq("task_id", task_id)
        fetchData()
    }

    const toggleCompleted = async (task_id: string, currentValue: boolean) => {
        const { error } = await supabase.from("tasks").update({ completed: !currentValue }).eq("task_id", task_id)
        if (error) {
            alert("failed to update the status")
            return
        }
        fetchData()
    }
    return (
        <div>
            <div className='flex justify-end'>
                <button className='px-4 py-2 border rounded-md m-2'><Link href="/tasks/new">New Task</Link></button>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <div>
                    <h1 className='text-center mb-4'>Your Current Tasks</h1>
                    <table>
                        <tbody>
                            {taskList.map((task, index) => {
                                return (
                                    <tr key={task.task_id}>
                                        <td>{index + 1}</td>
                                        <td className='px-6'>{task.description}</td>
                                        <td className='px-4'><input type="checkbox" checked={task.completed} onChange={() => (toggleCompleted(task.task_id, task.completed))} /></td>
                                        <td><button className='hover:cursor-pointer' onClick={() => { deleteTask(task.task_id) }}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}