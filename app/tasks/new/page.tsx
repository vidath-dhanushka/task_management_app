"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";

interface TaskInputs {
    task_name: string
    description: string
}

const NewTask = () => {
    const router = useRouter()
    const user = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<TaskInputs>()

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    const formSubmit = async (data: TaskInputs) => {
        const { data: { user } } = await supabase.auth.getUser()
        const { task_name, description } = data
        if (!user) {
            alert("please log in first")
            return
        }
        const table_data = { user_id: user.id, task_name: task_name, description: description, completed: false }
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
            <div className="bg-slate-700 p-4 rounded-md text-center">
                <h1 className="mb-4 text-xl">Add New Task</h1>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="flex justify-between w-full mb-6">
                        <label htmlFor="name">Task Name</label>
                        <input {...register("task_name", { required: "Please enter a name for the task" })} type="text" className="border rounded border-grey-500" id="name" />
                        <small>{errors?.task_name && errors.task_name.message}</small>
                    </div>
                    <div className="flex justify-between w-full mb-6">
                        <label htmlFor="description">Task Description</label>
                        <input {...register("description", { required: "Please enter a description for the task" })} type="text" className="border rounded border-grey-500" id="description" />
                        <small>{errors?.description && errors.description.message}</small>
                    </div>
                    <button type="submit" className="py-2 px-4 border rounded">Add</button>
                </form>
                <div className="mt-4 flex justify-start">
                    <Link href={"/tasks"} className="underline">Back to tasks</Link>
                </div>
            </div>
        </div>
    )
}

export default NewTask