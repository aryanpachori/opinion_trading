"use client"
import React from 'react'
import DepositForm from '../../../../components/landing/DepositForm'
import { useSession } from 'next-auth/react'


const Page = () => {
  const {data} = useSession();
  console.log(data?.user);
  

  
  return (
    <div className='h-[90vh] w-full flex justify-center items-center'>
        <DepositForm/>
    </div>
  )
}

export default Page
