import React from 'react'
import {FaStarHalfAlt,FaStar ,FaRegStar} from "react-icons/fa"
const color="#f8da5b"
function Rating({
  value,text
}) {

  return (
  <div>
  <div className='flex gap-1'>
  <span>
 {
  value >=1 ? <FaStar color={color}  size={16} /> : 
  value>= 1.5 ? <FaStarHalfAlt color={color} size={16}  /> :
  <FaRegStar color={color} size={16}  />
 }

  </span>
  <span>
 {
  value >=2 ? <FaStar color={color}  size={16}  /> : 
  value>= 2.5 ? <FaStar color={color} HalfAlt size={16}  /> :
  <FaRegStar color={color} size={16}  />
 }

  </span>
  <span>
 {
  value >=3 ? <FaStar color={color}  size={16}  /> : 
  value>= 3.5 ? <FaStar color={color} HalfAlt size={16}  /> :
  <FaRegStar color={color} size={16}  />
 }

  </span>
  <span>
 {
  value >=4 ? <FaStar color={color}  size={16}  /> : 
  value>= 4.5 ? <FaStar color={color} HalfAlt size={16}  /> :
  <FaRegStar color={color} size={16}   />
 }

  </span>
</div>
<span className='my-3 font-semibold'>{text}</span>
  </div>
    
  )
}

export default Rating
