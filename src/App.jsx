import "./App.css";
import Pizza from "./components/Pizza";
{/*import Cart from './components/Cart'*/}
{/*import Login from './components/Login'*/}
{/*import Register from './components/Register'*/}
import Footer from "./views/Footer";
{/*import Home from './views/Home'*/}
import Navigation from "./views/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Pizza />
      {/*<Home />*/}
      {/*<Register/>*/}
      {/*<Login/>*/}
      {/*<Cart/>*/}
      <Footer />
    </>
  );
}

export default App;
