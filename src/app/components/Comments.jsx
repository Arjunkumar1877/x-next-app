'use client';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import Comment from './Comment';
import { useSession } from 'next-auth/react';

export default function Comments({id}) {
    const db = getFirestore(app);
   
    const [comments, setComments] = useState([]);
    useEffect(()=>{
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot)=>{
            setComments(snapshot.docs);
        })

     
    }, [db, id]);

  

  return (
    <div>
      {
        comments.map((comment)=> (
            <Comment key={comment.id} comment={comment.data()} commentId={comment.id} originalPostId={id}/>
        ))
      }
    </div>
  )
}
