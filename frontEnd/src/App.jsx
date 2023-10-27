import AppLayout from "./AppLayout"
import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn"
import {AnimatePresence} from "framer-motion"
function App() {

  return (
    <AnimatePresence>
    <Router>
    <AppLayout>
    <Routes>
         <Route path="/cart" element={<Cart />} />
         <Route path="/signIn" element={<SignIn />} />
    </Routes>
    <div>Hello</div>
    </AppLayout> 
   </Router>
    </AnimatePresence>
    
  )
}

export default App
