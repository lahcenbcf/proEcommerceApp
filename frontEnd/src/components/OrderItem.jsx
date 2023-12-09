
function OrderItem({
    image,
    product,
    name,
    qty,
    unit_price,
    price
}) {
  return (
    
    <li>
    <div className="flex py-4 border-b-[1px] border-slate-400 items-center">
      {/* product image */}
      <div className="w-10 h-10  border-slate-600 rounded-sm">
      <img src={image} className="w-[100%] h-[100%] object-cover" />
      </div>

      {/* product name */}
      <p className="mx-4 font-semibold">{product.name}</p>
      {/* item id */}
      <p>{name.split(" ")[1] }</p>

  {/*quantity*/}
  <p className="text-slate-500 mx-4 font-semibold">{qty + "*"+ unit_price+"$ =" +price + "$"}</p>

    </div>
    </li>
    
  )
}

export default OrderItem
