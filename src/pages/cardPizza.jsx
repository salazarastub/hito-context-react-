import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const defaultPizza = {
  name: 'Cargando...',
  price: 0,
  ingredients: [],
  img: '',
  description: 'Cargando información de la pizza...',
};

const CardPizza = ({ pizzaId = 'p001', pizzaData = null }) => {
  const [pizza, setPizza] = useState(() => pizzaData || defaultPizza);
  const { addToCart } = useCart();
  const currentPizza = pizzaData || pizza;
  const loading = !pizzaData && pizza.name === defaultPizza.name && pizza.price === defaultPizza.price;

  useEffect(() => {
    if (pizzaData) {
      return;
    }

    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${pizzaId}`);

        if (!response.ok) {
          throw new Error('No se pudo cargar la pizza');
        }

        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error('Error al obtener la pizza:', error);
        setPizza(defaultPizza);
      }
    };

    fetchPizza();
  }, [pizzaData, pizzaId]);

  const handleAddToCart = () => {
    addToCart({
      id: currentPizza.id || pizzaData?.id || pizzaId,
      name: currentPizza.name,
      price: Number(currentPizza.price || 0),
      img: currentPizza.img,
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={currentPizza.img} className="card-img-top" alt={currentPizza.name} style={{ height: '260px', objectFit: 'cover' }} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize fw-bold">{currentPizza.name}</h5>

        <p className="card-text fw-bold mb-2">Precio: ${Number(currentPizza.price || 0).toLocaleString()}</p>

        <p className="card-text mb-3">{currentPizza.description}</p>

        <p className="card-text fw-bold mb-2">Ingredientes:</p>
        <ul className="list-unstyled mb-3">
          {currentPizza.ingredients.map((ingredient, index) => (
            <li key={index}>- {ingredient}</li>
          ))}
        </ul>

        {loading && <p className="text-muted small">Cargando pizza...</p>}

        <div className="mt-auto">
          <button type="button" className="btn btn-outline-primary me-2">
            Ver más
          </button>
          <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;