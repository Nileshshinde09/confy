import React from 'react'
import { useSession } from "next-auth/react"
import { RxCross1 } from 'react-icons/rx';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction } from '../redux/reducer'
import { signOut } from 'next-auth/react';
const profile = () => {
  const logoutaction=()=>{
      if (confirm("Are you shure ?")){
        signOut()
      }
  }
  const { data: session } = useSession()
  const dispatch = useDispatch()
  return (
    <div className='absolute md:left-24 max-sm:inset-0 mx-auto sm:h-3/4 sm:w-2/6  rounded-2xl shadow-lg shadow-slate-400 bg-slate-300 text-slate-950 text-center my-auto'>
        <button className='text-3xl absolute left-1 top-2' onClick={()=>dispatch(toggleChangeAction())}>
        <RxCross1/>
        </button>
        {
          session.user.image?
          <img className='rounded-full md:w-20 sm:w-15 w-20 mx-auto my-5 shadow-black shadow-lg' src={session.user.image} />
          :
          <Image src={"/images/profileimg.png"} className='rounded-full md:w-20 sm:w-15 w-20 h-auto mx-auto my-5 shadow-black shadow-lg' width={100} height={100}/>
        }
        <h1 className='md:text-3xl text-xl font-semibold my-2'>{session.user.name}</h1>
        <h1 className='md:text-3xl text-xl font-semibold my-2 overflow-clip'>{session.user.email}</h1>
        <h1 className='md:text-3xl text-xl font-semibold my-2 overflow-clip'>UserName : {session.user.email.split("@")[0]}</h1>
        <button className='bg-red-500 px-5 py-2 rounded-lg hover:px-6 hover:py-3 md:my-10 my-3' onClick={()=>logoutaction()}>
          Log Out
        </button>
    </div>
  )
}

export default profile