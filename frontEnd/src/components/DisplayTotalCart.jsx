import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveTotalPrice,saveTotalItems } from '../actions/cart';

function DisplayTotalCart() {
  const { cart :{
    totalPrice,
    totalItems
  }, error} = useSelector((store) => store.cart);
  const dispatch=useDispatch()
 

  return (
    <div className="p-4">
      <div className="border border-1 p-3 my-3">
        <h1>{`SUBTOTAL OF ${totalItems} ITEMS`}</h1>
        <h4>{Math.round(totalPrice)} $</h4>
      </div>
      <div className="p-4 border border-1 ">
        <Link to={"/shipping"} className="w-full mx-auto rounded-sm px-6 py-2 bg-black text-white">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}

export default DisplayTotalCart;
