"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase-client";

interface TaskInputs {
    task_name: string
    description: string
}

const newTask = () => {
    const router = useRouter()
    const user = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<TaskInputs>()
    const getLoginData = async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();
        console.log(session)
        return (session!.user.id)
    }
    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    const formSubmit = async (data: TaskInputs) => {
        const { task_name, description } = data
        console.log(user.id)
        let table_data = { user_id: user.id, task_name: task_name, description: description, completed: false }
        console.log(table_data)
        const { error } = await supabase.from("tasks").insert(table_data)
        if (error) {
            alert(`insert unsuccessful, please try again, ${error}`)
            router.push("/tasks/new")
        } else {
            alert("new task added successfully")
            router.push("/tasks")
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-700 p-4 rounded-md">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div>
                        <label htmlFor="name">Task Name</label>
                        <input {...register("task_name", { required: "Please enter a name for the task" })} type="text" className="border rounded border-grey-500" id="name" />
                        <small>{errors?.task_name && errors.task_name.message}</small>
                    </div>
                    <div>
                        <label htmlFor="description">Task Description</label>
                        <input {...register("description", { required: "Please enter a description for the task" })} type="text" className="border rounded border-grey-500" id="description" />
                        <small>{errors?.description && errors.description.message}</small>
                    </div>
                    <button type="submit" className="py-2 px-4 border rounded">Add</button>
                </form>
            </div>
        </div>
    )
}

export default newTask