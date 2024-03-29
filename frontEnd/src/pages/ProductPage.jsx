import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { getProduct } from '../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../actions/cart';
import Loader from '../components/Loader';
import CustomerReview from '../components/CustomerReview';
import { IoArrowBackCircleOutline } from "react-icons/io5";

function ProductPage() {
  const { productId } = useParams();

  
  const dispatch = useDispatch();
  const { productData, error, loading } = useSelector(
    (store) => store.productData
  );


  const addToCart = (e) => {
    e.preventDefault();
    dispatch(addCartItem(productData._id));
  };


  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container mx-auto my-4 min-h-screen px-4 mt-24">
          {/* try with single data */}
          <h3 className="my-4 font-semibold text-secondary flex items-center gap-2"><span><IoArrowBackCircleOutline /></span> Go back</h3>
          <div className="flex flex-wrap gap-[3rem]">
            <img
              src={`data:image/${productData?.image?.extName};base64,${productData?.image?.data}`}
              alt={productData?.name}
              className="w-[24rem] max-h-[30rem] rounded-lg shadow-lg object-cover flex-fluid flex-grow"
            />
            <div className="flex-fluid max-w-md">
              <h1 className="font-bold mb-6">{productData?.name}</h1>
              <hr />
              {/* rating */}
              <div className="my-6">
                <Rating
                  value={productData?.rating}
                  text={`${productData?.numReviews} reviews`}
                />
              </div>
              <hr />
              <h3 className="font-semibold my-6">
                Price :{' '}
                <span className="text-slate-400">${productData?.price}</span>{' '}
              </h3>
              <hr />
              <p className="my-6 text-slate-400 text-lg">
                <span className="text-xl font-semibold block text-black">
                  Description :
                </span>
                Le lorem ipsum est, en imprimerie, une suite de mots sans
                signification utilisée à titre provisoire pour calibrer une mise
                en page, le texte définitif venant
              </p>
              <button
                className="px-3 py-2 rounded-md bg-slate-600 text-white w-32 uppercase shadow-lg"
                onClick={addToCart}
              >
                add to cart
              </button>
            </div>
          </div>
          {productData?.reviews && (
            <div className="relative">
              <CustomerReview
                reviews={productData?.reviews}
                numReviews={productData?.numReviews}
                productId={productId}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductPage;
