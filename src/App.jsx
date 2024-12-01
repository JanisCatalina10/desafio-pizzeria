import CartProvider  from "./context/CartContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Pizza from "./Pages/Pizza";
import Profile from "./Pages/Profile";
import Navigation from "./views/Navigation";
import Footer from "./views/Footer";
import NotFound from "./Pages/Notfound";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <>
    <UserProvider>
    <CartProvider>
    <div className="app-container">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Pizza/:id" element={<Pizza />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </CartProvider>
    </UserProvider>
    </>
  );
}

export default App;
