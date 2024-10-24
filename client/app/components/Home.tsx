import React from 'react'
import {Hero} from '../../components/landing/Hero'
import TakesCareWrapper from "../../components/landing/TakesCare"
import FAQS from "../../components/landing/FAQs"

export const HomeComponent = () => {
  return (
    <div>
      <Hero/>
      <div className='w-full flex justify-center items-center '>
      <TakesCareWrapper/>
      </div>
      <FAQS/>
    </div>
  )
}
