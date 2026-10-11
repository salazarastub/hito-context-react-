import React from 'react';
import Navbar from './components/navbar';
import Login from './components/login';
import Footer from './components/Footer';
import Home from './components/home';
import Cart from './components/cart';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Cart />
      <Login />
      <Footer />
    </>
  );
}

export default App;