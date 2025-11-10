"use client"

import { useState } from "react"
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
interface FormInputs {
    email: string,
    password: string
}

const Login = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const router = useRouter()

    const formSubmit = async (data: FormInputs) => {
        setError("")
        if (isSignIn) {
            const { error } = await supabase.auth.signInWithPassword(data)
            if (error) {
                setError(error.message)
                return
            }
        } else {
            const { error } = await supabase.auth.signUp(data);
            if (error) {
                setError(error.message)
                return
            }
        }
        router.push("/tasks")
    }

    const updateSignUp = () => {
        setIsSignIn(prev => !prev)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-700 rounded-md p-8 text-center">
                <h1>{isSignIn ? "Login" : "Sign Up"}</h1>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="flex justify-between w-full mb-6">
                        <label htmlFor="email">Email</label>
                        <input {...register("email", { required: "Email is required" })} type="email" name="email" id="email" className="border rounded border-grey-500" />
                        <small>{errors?.email && errors.email.message}</small>
                    </div>
                    <div className="flex justify-between w-full mb-6">
                        <label htmlFor="password">Password</label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} type="password" name="password" id="password" className="border rounded border-grey-500 ml-2" />
                        <small>{errors?.password && errors.password.message}</small>

                    </div>
                    <button type="submit" className="border px-4 py-2 mt-2 rounded hover:cursor-pointer hover:bg-slate-900">{isSignIn ? "Sign In" : "Sign Up"}</button>
                    <p className="underline" onClick={updateSignUp}>{isSignIn ? "Haven't sign up? create an account." : "Already have an account? Sign In."}</p>
                </form>
                {error && <p className="text-red-700">{error}</p>}
            </div>
        </div>
    )
}

export default Login