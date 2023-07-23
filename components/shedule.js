import React from 'react'
import Swiper from './card'
const shedule = () => {
    return (
        <div className='bg-slate-300 border-2 text-center border-black h-full p-2 m-3 rounded-md shadow-lg text-zinc-900 shadow-zinc-500'>
            <div className='text-2xl font-semibold '>Sheduled Sessions</div>
            <hr className='mx-3 md:mx-6 bg-black my-1 border-0 h-[1.5px]' />
            <div>
                <div className="flex justify-center overflow-x-scroll no-scrollbar">
                    <div className=" flex md:flex-row flex-col px-4 py-2 my-10 gap-y-7 gap-x-7 max-w-7xl">
                   <div></div>
                        <Swiper/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default shedule