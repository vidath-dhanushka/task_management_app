"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';


interface Task {
    task_id: number,
    description: string
}

export default function tasks() {
    const { user } = useAuth()
    const [taskList, setTaskList] = useState<Task[]>([])
    const router = useRouter()

    const fetchData = async () => {
        const { data, error } = await supabase.from("tasks").select("*");
        console.log(data)
    }
    useEffect(() => {
        fetchData()
    }, [user])

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);


    const deleteTask = (task_id: number) => {

    }
    return (
        <div>
            <div className='flex justify-end'>
                <button className='px-4 py-2 border rounded-md m-2'><Link href="/tasks/new">New Task</Link></button>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <div>
                    <h1 className='text-center mb-4'>Hello Tasks</h1>
                    <table>
                        <tbody>
                            {taskList.map((task, index) => {
                                return (
                                    <tr key={task.task_id}>
                                        <td>{index + 1}</td>
                                        <td className='px-6'>{task.description}</td>
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