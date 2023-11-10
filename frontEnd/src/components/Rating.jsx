import React from 'react'
import {FaStarHalfAlt,FaStar,FaRegStar} from "react-icons/fa"
function Rating({
  value,text
}) {
  return (
  <div>
  <div className='flex gap-1'>
  <span>
 {
  value >=1 ? <FaStar size={16} /> : 
  value>= 1.5 ? <FaStarHalfAlt size={16}  /> :
  <FaRegStar size={16}  />
 }

  </span>
  <span>
 {
  value >=2 ? <FaStar size={16}  /> : 
  value>= 2.5 ? <FaStarHalfAlt size={16}  /> :
  <FaRegStar size={16}  />
 }

  </span>
  <span>
 {
  value >=3 ? <FaStar size={16}  /> : 
  value>= 3.5 ? <FaStarHalfAlt size={16}  /> :
  <FaRegStar size={16}  />
 }

  </span>
  <span>
 {
  value >=4 ? <FaStar size={16}  /> : 
  value>= 4.5 ? <FaStarHalfAlt size={16}  /> :
  <FaRegStar size={16}   />
 }

  </span>
</div>
<span className='my-3 font-semibold'>{text}</span>
  </div>
    
  )
}

export default Rating
