function OrderSummary(props) {
  return (
    <div>
      {/* order summary */}
      <div className="p-3 border border-slate-400 rounded-sm max-w-lg my-5">
          <h1>ORDER SUMMARY</h1>
          <ul className="flex flex-col gap-4">
          <li className="flex justify-between border-b-[1px] py-3">
            <p>items</p>
            <span>{props.totalItems}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>shipping</p>
            <span>{props.totalPrice < 100 ? "0$" :"10$"}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>Tax</p>
            <span>{Math.round(props.tax) * props.totalPrice+"$"}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>Total</p>
            {
              props.totalPrice + (props.totalPrice < 100 ? 10 : 20) + 40  + "$"
            }
           
          </li>
          </ul>
          {
            props.submitHandler && <button onClick={props.submitHandler} className="bg-black text-white px-3 pb-3 pt-2 my-3 w-full outline-none">place order</button>
          }
          
      </div>
    </div>
  )
}

export default OrderSummary
