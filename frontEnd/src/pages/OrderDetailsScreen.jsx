import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem';
import Spinner from '../utils/Spinner';
import { getOrderById, payOrder } from '../actions/orders';
import { useNavigate, useParams } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import Message from '../components/Message';
import { placeholderApi } from '../actions/products';

import {PayPalButton} from "react-paypal-button-v2"


function OrderDetailsScreen() {
  const dispatch = useDispatch();
  const { loading, success, error, orderinfo } = useSelector(
    (store) => store.orderDetails
  );

  const [sdkReady, setSdkReady] = useState(false);

  const {
    cart: { shippingAdress, paymentMethod, cartItems },
  } = useSelector((store) => store.cart);
  const { id } = useParams();
  const { success: successPay, loading: loadingPay } = useSelector(
    (store) => store.orderPaidReducer
  );
  const totalPrice = useMemo(() => {
    var initialPrice = 0;
    if (orderinfo.orderItem) {
      orderinfo.orderItem.forEach((item) => (initialPrice += item.price));
    }

    return initialPrice;
  });
  const tax = Number(totalPrice * 0.11);

  const totalItems = useMemo(() => {
    var initialItems = 0;
    if (orderinfo.orderItem) {
      orderinfo.orderItem.forEach((item) => (initialItems += item.qty));
    }

    return initialItems;
  });


  const successHandler=(paymentResult)=>{
        dispatch(payOrder(id,paymentResult))
  }
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: PAYPAL_CLIENT_ID } = await placeholderApi.get(
        '/api/config/paypal'
      );

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
      script.onload = () => {
        setSdkReady(true);
        document.body.appendChild(script);
      };
    };

    if (!!orderinfo || successPay) {
      
      dispatch(getOrderById(id));
    }else if(!orderinfo.idPaid) { 
        if(!window.paypal){
          addPaypalScript()
        }else{
          setSdkReady(true)
        }
    }
  }, [dispatch, successPay, id]);

  return (
    <div className="container mx-auto p-4">
      {loading && <Spinner />}
      {!success ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h1>{'ORDER ' + orderinfo._id}</h1>
          <div className="flex flex-wrap">
            <div className="max-w-xl">
              {/* SHIPPING */}
              <div className="my-4">
                <h2 className="font-semibold my-3">SHIPPING</h2>
                <p>
                  <span className="text-slate-400 font-semibold">name : </span>
                  {orderinfo.orderOwner.name}
                </p>
                <p>
                  <span className="text-slate-400 font-semibold">
                    Adress :{' '}
                  </span>
                  {shippingAdress.adress}
                </p>
                <p>
                  <a
                    href={`mailto:${orderinfo.orderOwner.email}`}
                    className="text-slate-400 font-semibold"
                  >
                    Email : {orderinfo.orderOwner.email}
                  </a>
                </p>
                {!orderinfo?.isDelivered && (
                  <Message message={'not Delivered'} status={false} />
                )}
              </div>
              {/* PAYMENT METHOD */}
              <div className="mb-6">
                <h2 className="font-semibold my-3">PAYMENT METHOD</h2>
                <p>{paymentMethod}</p>
                {!orderinfo?.isPaid && (
                  <Message message={'not paid'} status={false} />
                )}
              </div>
              {/* ORDER ITEMS */}
              <div>
                <h2 className="font-semibold">ORDER ITEMS</h2>
                <ul>
                  {
                    <ul className="list-none">
                      {orderinfo.orderItem.map((item) => (
                        <OrderItem
                          name={item.name}
                          product={item.product}
                          image={item.image}
                          unit_price={item.unit_price}
                          price={item.price}
                          qty={item.qty}
                        />
                      ))}
                    </ul>
                  }
                </ul>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="max-w-lg flex flex-col gap-2" >
          <OrderSummary
            tax={tax}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />

          {!orderinfo.isPaid && (
            loadingPay ? <Spinner /> :
            <PayPalButton amount={orderinfo.totalPrice} onSuccess={successHandler} />
          )}
          </div>          

          
        </div>
      )}
    </div>
  );
}

export default OrderDetailsScreen;
