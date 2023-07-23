import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
const joinSession = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      roomid: '',
      role:''
    },
    onSubmit: values => {
      if (values.roomid === '') {
        alert("You Entered Nothing!!")
        return 
      }
      router.push(`https://confyv.vercel.app/conference?roomID=${values.roomid}&role=${values.role}`)
      // console.log(JSON.stringify(values, null, 2));
      
    },
  });
  return (
    <>
      <div className='bg-slate-300 border-2 text-center border-black h-full p-2 m-3 rounded-md shadow-lg text-zinc-900 shadow-zinc-500'>
        <div className='text-2xl font-semibold '>Join Sessions</div>
        <hr className='mx-3 md:mx-6 bg-black my-1 border-0 h-[1.5px]' />
        <form onSubmit={formik.handleSubmit}>
          <label forHtml="countries" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Select Joining Position</label>
          <select name='role' onChange={formik.handleChange} value={formik.values.role} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Cohost">Co-Host</option>
            <option value="Audience">Audience</option>
          </select>
          <div className="mb-6">
            <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Enter Room Id</label>
            <input name='roomid' onChange={formik.handleChange} value={formik.values.roomid} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type='submit' className='bg-indigo-500 text-xl font-semibold px-5 py-2 rounded-lg hover:animate-bounce mt-7'>Join</button>
        </form>
      </div>
    </>
  )
}

export default joinSession
