import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { app } from '../firebase';
import { useSession } from 'next-auth/react';

export default function Comment({comment, commentId, originalPostId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const db = getFirestore(app);
    const {data: session} =  useSession();

    const likePost = async () => {
        console.log("clicked liking")
        if (session) {
            if (isLiked) {
              deleteDoc(doc(db, "posts", originalPostId, "comments", commentId, 'likes', session?.user?.uid));
            } else {
              await setDoc(doc(db, "posts", originalPostId, "comments", commentId, 'likes', session.user.uid), {
                username: session.user.username,
                timestamp: serverTimestamp(),
              });
            }
          } else {
            signIn();
          }
          
      };

  

    useEffect(() => {
        onSnapshot(collection(db, "posts", originalPostId, 'comments', commentId, "likes"), (snapshot) => {
          setLikes(snapshot.docs);
        });
      }, [db]);
    
    useEffect(() => {
        setIsLiked(
          likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
      }, [likes]);

    console.log(isLiked)

    
  return (
    <div className='flex p-3 border-b border-gray-200 hover:bg-gray-100 pl-10'>
        <img src={comment?.userImage} alt="user-img" className='h-9 w-9 rounded-full mr-4 '/>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-sm truncate">
                        @{comment?.name}
                    </h4>
                    <span className="text-xs truncate">
                        {comment?.username}
                    </span>
                </div>
                <HiDotsHorizontal className='text-sm' />
            </div>

<p className="text-gray-800 text-xs my-3 ">{comment?.comment}</p>

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
{
  likes.length > 0 && (
    <span className={`text-xs ${isLiked && 'text-red-600'}`}>
      {likes.length}
    </span>
  )
}


</div>


        </div>
    </div>
  )
}
