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
function App() {
  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path="/signIn" element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path='' element={<PrivateRoute />}>
            <Route path='/myProfile' element={<ProfilePage />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/order' element={<OrderScreen />} />
            </Route>
            
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
