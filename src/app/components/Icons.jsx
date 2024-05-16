"use client";

import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineChat,
  HiHeart,
} from "react-icons/hi";
import { app } from "../firebase";

export default function Icons({ id, uid }) {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const deletePost = async()=>{
   if(window.confirm('Are you sure you want to delete this post ?')){
    if(session?.user?.uid === uid){
        deleteDoc(doc(db, 'posts', id)).then(()=>{
            console.log("document sucessfully deleted .");
            window.location.reload();
        }).catch((err)=>{
            console.log(err.message + "error removing image...")
        })
    }else{
        alert('You are not authorized to delete this post. ')
    }
  
   }
  }

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />

      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && "text-red-600"}`}>
            {likes.length}
          </span>
        )}
      </div>

{
    session?.user?.uid === uid ? (
        <HiOutlineTrash onClick={deletePost} className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100" />
    ) :(
        ""
    )
}
     
    </div>
  );
}
