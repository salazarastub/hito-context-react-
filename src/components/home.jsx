import React, { useEffect } from 'react';
import Header from './header';
import CardPizza from './cardPizza';
import { pizzas } from './pizzas';

const Home = () => {
  useEffect(() => {
    fetch('http://localhost:5000/pizzas')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="container py-4">
      <Header title="Bienvenidos a Mamma Mia!" description="Pizzas artesanales, hechas con amor." />

      <div className="row g-4 mt-3">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="col-md-4">
            <CardPizza
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;