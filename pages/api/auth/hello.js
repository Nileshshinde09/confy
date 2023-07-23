import React from 'react'
import connectMongo from '../../../database/conn'
const hello = () => {
    connectMongo().catch(error=>res.json({error:"Connection Faild...!"}))
  return (
    <div>
      hi
    </div>
  )
}

export default hello
