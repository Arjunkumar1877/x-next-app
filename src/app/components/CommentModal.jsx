"use client";

const { useRecoilState } = require("recoil");
import { modalState } from '../atom/modalAtom';

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    console.log(open)
  return (
    <div>
        <h1 className="">Comments Modal</h1>
        {
            open === true ?  <h1>Comment Modal is opened</h1> : <h1></h1>
        }
    </div>
  )
}
