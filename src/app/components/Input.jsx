'use client';

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";


export default function Input() {
    const { data: session } = useSession();

 if(!session) return null;

 return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img src={session?.user?.image} alt="img" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />
       <div className="w-full divide-y divide-gray-200">
        <textarea rows={'2'} className="w-full border-none outline-none min-h-[50px] text-gray-700" placeholder="What's happening "></textarea>
        <div className="flex items-center justify-between p-2.5">
            <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500 hover:text-sky-900 rounded-full cursor-pointer" />
            <button  disabled className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" >Post</button>
        </div>
       </div>
    </div>
  )
}
