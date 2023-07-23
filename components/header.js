import React, { use } from 'react'
import {useSession} from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction } from '../redux/reducer'
import Profile from './profile'
import Image from 'next/image'
import Headerclock from './clock'
const header = () => {
    
    const dispatch = useDispatch()
    const visible = useSelector((state)=>state.app.client.toggleForm)
    const { data: session } = useSession()
    return (
    
        <div>

        <header className="text-gray-300 bg-gray-700 body-font">
            <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                <button className="" href={"#"} onClick={()=>dispatch(toggleChangeAction())}>
                    {
                        session.user.image?
                        <img className='rounded-full md:w-16 sm:w-15 w-12 shadow-slate-950 shadow-md' src={session.user.image}/>
                        :
                        <Image src={"/images/profileimg.png"} className='rounded-full md:w-16 sm:w-15 w-12 ' width={100} height={100}/>
                    }
                </button>
                <nav className="text-sky-300 md:ml-auto flex flex-wrap items-center justify-center space-x-4">
                    {/* <div className='flex text-5xl  md:mr-10 max-sm:my-2'><Headerclock/></div> */}
                    
                    <Link href={"/conference"} className="mr-5 hover:text-gray-900 text-2xl">Start Streaming</Link>
                    <Link href={"#"} className="mr-5 hover:text-gray-900 text-2xl">About</Link>
                   
                </nav>
            
            </div>
        </header>
        {
            visible?
                <Profile/>
            :
            <></>
        }
        </div>
    )
}

export default header

