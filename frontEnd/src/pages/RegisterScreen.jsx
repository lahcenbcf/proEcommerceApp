import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/user';
import Spinner from '../utils/Spinner';
import GoToLogin from '../utils/GoToLogin';
import { INIT_REGISTER } from '../constants/userLogin';
function RegisterScreen() {
  const dispatch = useDispatch();
  const {userInfo}=useSelector(state => state?.login)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate()
  const { loading, error, success } = useSelector((store) => store.register);
  const RegisterHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = [...formData.values()];
    const keyValueObj = Object.fromEntries(formData);
    if (values.includes('')) return;
    if (keyValueObj['password'] != keyValueObj['confirmedPassword']) return;
    setIsSubmitting(true);
    dispatch(
      registerUser(
        keyValueObj['email'],
        keyValueObj['password'],
        keyValueObj['username']
      )
    );
  };

  useEffect(() => {
    if (success || error) setIsSubmitting(false);
  }, [success, error]);

  useEffect(() => {
    return () =>
      dispatch({
        type: INIT_REGISTER,
      });
  }, []);

  useEffect(()=>{
        if(userInfo?._id) navigate("/")
  },[userInfo?._id])
  return (
    <>
      {success ? (
        <GoToLogin />
      ) : (
        <div>
          {/* spinner loader */}
          {loading && <Spinner />}
          <div className="max-w-lg min-h-screen mx-auto my-32 rounded-md shadow-lg p-4">
            <h1 className="mb-6 text-slate-600">SIGN UP</h1>
            {/* erreur message */}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={RegisterHandler}>
              <div className="inputGroup my-4">
                <label htmlFor="username" className=" mt-6 mb-2">
                  username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3"
                />
              </div>
              <div className="inputGroup mb-4">
                <label htmlFor="email">email </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3"
                />
              </div>
              <div className="inputGroup mb-4">
                <label htmlFor="password" className="mt-6 mb-2">
                  password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3"
                />
              </div>
              <div className="inputGroup mb-4">
                <label htmlFor="confirm" className="mt-6 mb-2">
                  password
                </label>
                <input
                  id="confirm"
                  name="confirmedPassword"
                  type="password"
                  placeholder="confirm-password"
                  className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3"
                />
              </div>
              <button
                type="submit"
                aria-disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white my-3"
              >
                Register
              </button>
            </form>
            <p className="text-slate-600">
              have an account{' '}
              <Link to="/signIn" className="underline text-black font-semibold">
                sign In
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterScreen;
