import { Link, useNavigate } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { BiSolidUser } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import SideBar from './SideBar';
import { CiShop } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox';
import { logoutUser } from '../actions/user';
const Navbar = () => {
  const [toggleBar, setToggleBar] = useState(false);
  const { userInfo } = useSelector((store) => store.login);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    navigate("/signIn")
  };

  return (
    <header className="bg-background text-text w-full overflow-hidden min-h-[5rem] flex items-center fixed top-0 z-10">
      <nav className="container mx-auto nav shadow-lg flex items-center justify-between py-4 px-3 relative">
        {/* menuBar icon */}
        <div
          className="absolute left-2 mr-10 z-20 bg-white text-secondary p-3 rounded-full md:hidden"
          onClick={() => setToggleBar(!toggleBar)}
        >
          {toggleBar ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </div>
        {/* logo */}
        <Link to={'/'}>
          <div className="logo flex items-center justify-center gap-6">
            <CiShop size={20} className="scale-150 animate-pulse" />
            <div className="logoName text-xl">
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>S</span>
              <span>H</span>
              <span>O</span>
              <span>P</span>
            </div>
          </div>
        </Link>
        {/* search box */}
        {userInfo._id && <SearchBox />} {/* items */}
        <ul className="hidden md:flex md:gap-8">
          {userInfo._id && (
            <li>
              <Link
                to={`/cart/${userInfo._id}`}
                className="flex items-center gap-2"
              >
                <BsFillCartFill
                  size={20}
                  className="opacity-70 hover:opacity-100"
                />
                <h3 className="opacity-70 hover:opacity-100 uppercase">cart</h3>
              </Link>
            </li>
          )}

          <li>
            {userInfo._id && userInfo.isAdmin && (
              <details className="dropdown">
                <summary className="text-lg mt-1 uppercase">Admin</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-black font-bold">
                  <li>
                    <Link to={'/admin'} className="uppercase">
                      users
                    </Link>
                  </li>
                  <li>
                    <Link to={'/admin/productList'} className="uppercase">
                      products
                    </Link>
                  </li>
                  <li>
                    <Link to={'/admin/orderList'} className="uppercase">
                      orders
                    </Link>
                  </li>
                </ul>
              </details>
            )}
          </li>
          <li>
            {userInfo._id ? (
              <button onClick={logout} className="flex items-center gap-2">
              <BiSolidUser
                  size={20}
                  className="opacity-70 hover:opacity-100"
                />
                <h3 className="opacity-70 hover:opacity-100 uppercase ">sign Out</h3>
              </button>
            ) : (
              <Link to={'/signIn'} className="flex items-center gap-2">
                <BiSolidUser
                  size={20}
                  className="opacity-70 hover:opacity-100"
                />
                <h3 className="opacity-70 hover:opacity-100 uppercase ">sign In</h3>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {/* sideBar */}
      {toggleBar && <SideBar />}
    </header>
  );
};

export default Navbar;
