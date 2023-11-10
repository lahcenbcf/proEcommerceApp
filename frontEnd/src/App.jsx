import AppLayout from './AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './pages/HomeScreen';
import ProductPage from './pages/ProductPage';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfilePage from './pages/ProfilePage';
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
            <Route path='/myProfile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
