import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function AppLayout({children}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default AppLayout
