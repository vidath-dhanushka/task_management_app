import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-around bg-zinc-50 font-sans dark:bg-black">
      <button className="border rounded-lg px-4 py-2"><Link href={"/login"}>Login</Link></button>
      <button className="border rounded-lg px-4 py-2"><Link href={"/tasks"}>Tasks</Link></button>
    </div>
  );
}
