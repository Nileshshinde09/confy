import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
const configstream = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      roomid: '',
      title:'',
      streamingoption:'',
      date:'',
      time:'',
      startnow:false,
    },
    onSubmit: values => {
      if (values.roomid === '' || values.title === '' || values.streamingoption === '' ||  values.date === '' || values.time === '') {
        alert("You live place blank!!")
        return 
      }
      if(values.startnow) router.push(`http://localhost:3000/conference?roomID=${values.roomid}&role=Host`)
      console.log(JSON.stringify(values, null, 2));
      if(!values.startnow){
        
      }
    },
  });
  
  return (
    <>
      <div className='bg-slate-300 border-2 text-center border-black h-full p-2 m-3 rounded-md shadow-lg text-zinc-900 shadow-zinc-500'>
        <div className='text-2xl font-semibold '>Shedule Your Event/Conference/Meeting</div>
        <hr className='mx-3 md:mx-6 bg-black my-1 border-0 h-[1.5px]' />
        <div>
          <form action={"#"} onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Enter The Title Of The Meeting/Conference</label>
              <input name='title' onChange={formik.handleChange} value={formik.values.title} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <label forHtml="countries" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Choose Calling Mode</label>
            <select id="countries" onChange={formik.handleChange} value={formik.values.streamingoption} name='streamingoption' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="OneONoneCall">One ON OneCall</option>
              <option value="LiveStreaming">LiveStreaming</option>
              <option value="LiveStreaming">BroadCast</option>
              <option value="LiveStreaming">Conference</option>

            </select>
            <div className="mb-6">
              <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Create Unique Room Id</label>
              <input onChange={formik.handleChange} value={formik.values.roomid} name='roomid' type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <hr className='mx-3 md:mx-6 bg-black my-1 border-0 h-[1.5px]' />
            <div className="mb-6">
              <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Enter Date </label>
              <input type="date" name='date' onChange={formik.handleChange} value={formik.values.date} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6">
              <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Enter Session Starting Time</label>
              <input type="time" name='time' onChange={formik.handleChange} value={formik.values.time} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6">
              <label forHtml="default-input" className="block mb-2 font-medium text-gray-900 text-xl md:text-2xl md:mt-10 mt-5">Or</label>
            </div>
            <div className="flex lg:mx-72 mx-20">
              <input id="checked-checkbox" type="checkbox" name='startnow' onChange={formik.handleChange} value={formik.values.startnow} className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-800 dark:border-gray-900" />
              <label forHtml="checked-checkbox" className=" ml-2 text-xl font-medium text-gray-900 dark:text-gray-900">Start Now</label>
            </div>

            <button type='submit' className='bg-indigo-500 text-xl font-semibold px-5 py-2 rounded-lg hover:animate-bounce mt-7'>Shedule</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default configstream