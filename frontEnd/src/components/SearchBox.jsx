import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
function SearchBox() {
    const [keyword,setKeyword] = useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const submitForm=(e)=>{
        e.preventDefault()
        if(!keyword || !keyword.trim()) return;
        navigate(`/search/${keyword}`)
    }
  return (
    <div>
    <form onSubmit={submitForm} className="flex gap-4">
    <input type="text" className="border bg-inherit text-white rounded-sm px-3 py-3 outline-none" placeholder="Search" onChange={(e)=>setKeyword(e.target.value)} />
    <button className="border border-[#42b883] rounded-sm text-[#42b883] px-2 hover:bg-[#42b883] hover:text-white hover:border-white">SEARCH</button>
    </form>
        
    </div>
  )
}

export default SearchBox
