import React from 'react'

const Message = ({
    message,status
}) => {
  return (
    <div className={`py-3 w-full border-2 ${status ? "bg-green-300 border-green-500" : "bg-red-300 border-red-600"} text-white px-4 my-4 font-semibold`}> 
        {message}
    </div>
  )
}

export default Message
