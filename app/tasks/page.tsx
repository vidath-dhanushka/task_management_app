"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';


interface Task {
    task_id: number,
    description: string
}

export default function tasks() {
    const [taskList, setTaskList] = useState<Task[]>([])

    const fetchData = async () => {
        const res = await axios.get("/api/task/2");
        setTaskList(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <h1>Hello Tasks</h1>
            <ul>
                {taskList.map(task => {
                    return <li key={task.task_id}>{task.description}</li>
                })}
            </ul>
        </div>
    )
}