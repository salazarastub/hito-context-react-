import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const defaultPizza = {
  id: '',
  name: 'Cargando...',
  price: 0,
  ingredients: [],
  img: '',
  description: 'Cargando información de la pizza...',
};

const Pizza = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState(defaultPizza);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
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

    if (pizzaId) {
      fetchPizza();
    }
  }, [pizzaId]);

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {loading ? (
            <div className="text-center py-5">
              <p className="fs-5 text-muted">Cargando pizza...</p>
            </div>
          ) : (
            <div className="card shadow-sm border-0">
              <div className="row g-0 align-items-center">
                <div className="col-md-5">
                  <img
                    src={pizza.img}
                    alt={pizza.name}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover', minHeight: '320px' }}
                  />
                </div>

                <div className="col-md-7">
                  <div className="card-body p-4">
                    <span className="badge text-bg-primary mb-3">Pizza</span>
                    <h2 className="card-title mb-3 text-capitalize">{pizza.name}</h2>

                    <p className="card-text fw-bold fs-5 mb-3">
                      Precio: ${Number(pizza.price || 0).toLocaleString()}
                    </p>

                    <p className="card-text mb-4">{pizza.description}</p>

                    <h5 className="fw-bold mb-2">Ingredientes:</h5>
                    <ul className="list-unstyled mb-4">
                      {pizza.ingredients?.map((ingredient, index) => (
                        <li key={index}>- {ingredient}</li>
                      ))}
                    </ul>

                    <div className="d-flex gap-2">
                      <Link to="/" className="btn btn-outline-primary">
                        Volver
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Pizza;
