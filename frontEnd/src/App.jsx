import AppLayout from './AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './pages/HomeScreen';
import ProductPage from './pages/ProductPage';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage';
import PaymentScreen from "./pages/PaymentScreen";
import OrderScreen from "./pages/OrderScreen";
import ShippingScreen from './pages/ShippingScreen';
import OrderDetailsScreen from "./pages/OrderDetailsScreen"
import AdminScreen from './pages/adminPages/AdminScreen';
import EditAdminScreen from './pages/adminPages/EditAdminScreen';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import ProductListScreen from './pages/adminPages/ProductListScreen';
import ProductEditScreen from "./pages/adminPages/ProductEditScreen.jsx"
import OrderAdminScreen from './pages/adminPages/OrderAdminScreen.jsx';


function App() {
  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path="/signIn" element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='' element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path='/myProfile' element={<ProfilePage />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeOrder' element={<OrderScreen />} />
            <Route path='/order/:id' element={<OrderDetailsScreen />} />
            <Route path='/admin' element={<PrivateRouteAdmin />}>
                <Route path='/admin' element={<AdminScreen />} />
                <Route path='/admin/editUser/:userId' element={<EditAdminScreen />} />
                <Route path='/admin/productList' element={<ProductListScreen />} />
                <Route path='/admin/product/edit/:productId' element={<ProductEditScreen />} />
                <Route path='/admin/orderList' element={<OrderAdminScreen/>} />
                <Route path='/admin/order/:id' element={<OrderDetailsScreen />} />
            </Route>
            
          </Route>
            
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
