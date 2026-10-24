const Header = ({ title = 'Pizzería Mamma Mia', description = 'Las mejores pizzas artesanales' }) => {
  const style = {
    backgroundImage: "url('/fondo.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    padding: '60px 20px',
    borderRadius: 8,
  };

  return (
    <header style={style} className="mb-4">
      <div className="container">
        <h1 className="display-5">{title}</h1>
        <p className="lead">{description}</p>
      </div>
    </header>
  );
};

export default Header;