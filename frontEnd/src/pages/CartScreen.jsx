import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { addCartItem } from '../actions/cart';
import CartItem from '../components/CartItem';
import DisplayTotalCart from '../components/DisplayTotalCart';
function CartScreen() {
  const location = useLocation();
  const [firstRender, setFirstRender] = useState(true);
  const { id } = useParams();
  const qty = location.search ? location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const {
    empty,
    error,
    cart: { cartItems },
  } = useSelector((store) => store.cart);

  useEffect(() => {
    setFirstRender(false);
  });
  useEffect(() => {
    !firstRender && dispatch(addCartItem(id, qty));
  }, [dispatch, qty, id]);
  const totalData = useMemo(() => {
    var totalPrice = 0;
    var totalItems = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price;
      totalItems += item.qty;
    });
    return { totalItems, totalPrice };
  });

  return (
    <div className="container mx-auto p-4 flex flex-wrap mt-24">
      <div className="cartItemsWrapper flex-fluid">
        {empty ? 
          <h3 className='text-black mt-20'>your cart is empty <Link className=' underline' to={"/"}>go to shopping</Link> </h3>
         : error ? (
          <h3>{error}</h3>
        ) : (
          cartItems.map((item) => <CartItem key={item.name} {...item} />)
        )}
      </div>

      {/* cartItems Total Display */}
      {cartItems.length && <DisplayTotalCart {...totalData} />}
    </div>
  );
}

export default CartScreen;
