
function DisplayTotalCart({totalItems=0,totalPrice=0}) {
  return (
    <div className="p-4">
    <div className="border border-1 p-3 my-3">
    <h1>{`SUBTOTAL OF ${totalItems} ITEMS`}</h1>
      <h4>{Math.round(totalPrice)} $</h4>
    </div>
      <div className="p-4 border border-1 ">
      <button className="w-full mx-auto rounded-sm px-6 py-2 bg-black text-white">
      Proceed to checkout
      </button>
      </div>
      
    </div>
  )
}

export default DisplayTotalCart
