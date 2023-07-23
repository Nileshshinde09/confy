import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../components/header'
import { getSession, useSession, signOut } from "next-auth/react"
import Configstream from '../components/configstream'
import Shedule from '../components/shedule'
import JoinSession from '../components/join'
export default function Home() {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/app_pages/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
          </div>
      </main>
  )
}
{/* <h5>{session.user.name}</h5>
<h5>{session.user.email}</h5> */}
// Authorize User
function User({ session, handleSignOut }){
  return(
    <main className="container mx-auto bg-gray-900 h-screen sm:overflow-y-scroll no-scrollbar">
          <div>
              <Header/>
              <div className='sm:grid grid-cols-2'>
                <div>
                <Configstream/>
                </div>
                <div className='grid-rows-2 sm:h-screen sm:overflow-y-scroll no-scrollbar'>
                    <div>
                    <Shedule/>
                    </div>
                    <div className='sm:mb-64'>
                    <JoinSession/>
                    </div>
                </div>

              </div>
          </div>      
    </main>
  )
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/app_pages/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }

}
