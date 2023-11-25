import { Link } from "react-router-dom"
import { GrLinkNext } from "react-icons/gr";
function CheckoutMap({step1,step2,step3,step4}) {
  return (
    <div className=" max-w-lg mx-auto my-4 flex justify-center gap-6 shadow-md px-4 py-2" >
            {
                step1 ? 
                <Link to={"/signIn"} className="font-semibold flex items-center gap-4">sign In <GrLinkNext /></Link> 
                : <Link aria-disabled={true}>signIn <GrLinkNext /></Link>
            }
            {
                step2 ? 
                <Link to={"/shipping"} className="font-semibold flex items-center gap-4">shipping <GrLinkNext /></Link> 
                : <Link aria-disabled={true}>shipping <GrLinkNext /></Link>
            }
            {
                step3 ? 
                <Link to={"/payment"} className="font-semibold flex items-center gap-4">payment <GrLinkNext /></Link> 
                : <Link aria-disabled={true} className="text-slate-400 flex items-center gap-4">payment <GrLinkNext /></Link>
            }
            {
                step4 ? 
                <Link to={"/order"} className="font-semibold flex items-center gap-4">order <GrLinkNext /></Link> 
                : <Link aria-disabled={true} className="text-slate-400 flex items-center gap-4">order <GrLinkNext /></Link>
            }
    </div>
  )
}

export default CheckoutMap
