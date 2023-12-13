
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Pagination() {
    const {pages,pageNum} =useSelector(store => store.productList)
  return (
    <>
    <div className="join ml-16">
{
  pages > 1 && [...Array(pages).keys()].map(x=>(
      <Link className={`${activePage}`} to={`/pages/${x+1}`}><button className="join-item btn">{x+1}</button></Link>
  ))
}

</div>
</>
  )
}

export default Pagination
