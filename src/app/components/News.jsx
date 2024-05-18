'use client';

import { useEffect, useState } from "react";

export default function News() {
    const [news, setNews] = useState([]);
    const [articlesNum, setArticleNum] = useState(3);

    useEffect(()=>{
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json').then((res)=> res.json()).then((data)=>{
            setNews(data.articles)
        })
    },[])
  return (
    <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2'>
                <h4 className="font-bold text-xl px-4">Whats happening</h4>
       {
        news && news.slice(0, articlesNum).map((article)=>(
            <div  key={article.url}>
                <a href={article.url} target="_blank">
                    <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
                        <div className="space-y-0.5">
                            <h6 className="text-sm font-bold ">{article.title}</h6>
                            <p className="text-xs font-medium text-gray-500">{article.source.name}</p>
                        </div>
                        <img src={article.urlToImage} alt="img" width={70} className="rounded-xl" />
                    </div>
                </a>
            </div>
        ))
       }
       <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400 text-sm " onClick={()=> setArticleNum(articlesNum + 3)}>
        Load more
       </button>
    </div>
  )
}
