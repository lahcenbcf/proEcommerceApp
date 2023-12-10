
function ReviewItem({
    desc,
    rating
}){
    return (
            <div className="w-full flex justify-between my-3">
                <p className="text-slate-700 font-bold">{desc}</p>
                <p>{rating}</p>
            </div>
    )
}

export default ReviewItem