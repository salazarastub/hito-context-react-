import React, { useEffect, useState } from 'react';

const defaultPizza = {
  name: 'Cargando...',
  price: 0,
  ingredients: [],
  img: '',
  description: 'Cargando información de la pizza...',
};

const CardPizza = ({ pizzaId = 'p001' }) => {
  const [pizza, setPizza] = useState(defaultPizza);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [pizzaId]);

  return (
    <div className="card h-100 shadow-sm">
      <img src={pizza.img} className="card-img-top" alt={pizza.name} style={{ height: '260px', objectFit: 'cover' }} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize fw-bold">{pizza.name}</h5>

        <p className="card-text fw-bold mb-2">Precio: ${Number(pizza.price || 0).toLocaleString()}</p>

        <p className="card-text mb-3">{pizza.description}</p>

        <p className="card-text fw-bold mb-2">Ingredientes:</p>
        <ul className="list-unstyled mb-3">
          {pizza.ingredients.map((ingredient, index) => (
            <li key={index}>- {ingredient}</li>
          ))}
        </ul>

        {loading && <p className="text-muted small">Cargando pizza...</p>}

        <div className="mt-auto">
          <button type="button" className="btn btn-outline-primary me-2">
            Ver más
          </button>
          <button type="button" className="btn btn-primary">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;