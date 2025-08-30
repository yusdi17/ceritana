import React from 'react'
import loader from '../../assets/animation/loader.json'
import Lottie from 'lottie-react'
export default function Loader() {
  return (
    <div className="w-40 h-40">
      <Lottie animationData={loader} loop={true} />
    </div>
  )
}
