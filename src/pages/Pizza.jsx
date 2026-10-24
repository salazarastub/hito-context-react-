import { useParams } from 'react-router-dom';
import CardPizza from './cardPizza';

const Pizza = () => {
  const { pizzaId } = useParams();

  return (
    <main className="container py-5">
      <CardPizza pizzaId={pizzaId || 'p001'} />
    </main>
  );
};

export default Pizza;
