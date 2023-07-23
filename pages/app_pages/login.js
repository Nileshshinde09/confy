import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {signIn} from "next-auth/react"
import { useState } from 'react';
import { signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../../lib/validate'
import connectMongo from '../../database/conn';
import Credentials from 'next-auth/providers/credentials';
import { useRouter } from 'next/router';
const login = () => {
  const [show, setShow] = useState(false)
    // formik hook
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : login_validate,
        onSubmit
    })

    async function onSubmit(values){
        const status  = await signIn('credentials',{
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl:"/"
        })
        if(status.ok){
          router.push(status.url);
        }
    }

  //Google handler function 
  const handlerGoogleSignin=async()=>{
    signIn('google',{callbackUrl:"http://localhost:3000"})
  }
  const handlerGithubSignin=async()=>{
    signIn('github',{callbackUrl:"http://localhost:3000"})
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image className='mr-2' alt='#' src={'/images/logo.png'} height={100} width={200}></Image>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input {...formik.getFieldProps('email')} type='email' name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input {...formik.getFieldProps('password')} type={`${show ? "text" : "password"}`} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <Link href={"#"} className="text-sm font-medium text-red-700 hover:underline dark:text-red-700">Forgot password?</Link>
                        </div>
                        <hr/>
                        <div className='text-center border-2 rounded-xl w-1/2 mx-auto'>

                        <button onClick={()=>handlerGoogleSignin()}>Sign in whith google</button>
                        </div>
                        <div className='text-center border-2 rounded-xl w-1/2 mx-auto'>

                        <button onClick={()=>handlerGithubSignin()}>Sign in whith Github</button>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <Link href={"/app_pages/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  )}
export default login