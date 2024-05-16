'use client';

import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { HiOutlineHeart, HiOutlineTrash, HiOutlineChat, HiHeart } from 'react-icons/hi';
import { app } from '../firebase';

export default function Icons({id}) {

    const db = getFirestore(app);
    const { data:session } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);


    const likePost = async()=>{
      if(session){

        if(isLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uuid));
        }else{

            await setDoc(doc(db, 'posts', id, "likes", session?.user?.uuid), {
                username: session.user.username,
                timestamp: serverTimestamp(),
            })
        }

      }else{
        signIn();
      }
    }

    useEffect(()=>{
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot)=> {
            setLikes(snapshot.docs);
        })
    },[db]);

    useEffect(()=>{
   setIsLiked(likes.findIndex((like)=> like.id === session?.user?.uuid) !== -1 );
    }, [likes])

  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
        <HiOutlineChat className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />

    <div className="flex items-center">

    {
            isLiked ? (
<HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />
            ):(
                <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
            )
        }

{
    likes.length > 0 && <span className={`text-xs ${isLiked && 'text-red-600'}` }>{likes.length}</span>
}
    </div>
        
        <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
    </div>
  )
}
