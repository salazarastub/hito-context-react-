import { useState } from 'react';

const initialForm = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setMessage({
        type: 'error',
        text: 'Todos los campos son obligatorios.',
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: 'error',
        text: 'El email ingresado no es válido.',
      });
      return;
    }

    setMessage({
      type: 'success',
      text: '¡Inicio de sesión exitoso!',
    });

    setFormData(initialForm);
  };

  return (
    <main className="container py-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#fff',
          padding: '32px 24px',
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        }}
      >
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label d-block text-start">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label d-block text-start">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Enviar
        </button>

        {message.text && (
          <p
            className={`mt-3 mb-0 text-center fw-bold ${
              message.type === 'success' ? 'text-success' : 'text-danger'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </main>
  );
};

export default Login;