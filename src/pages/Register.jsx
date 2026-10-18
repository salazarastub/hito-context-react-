import { useState } from 'react';

const initialForm = {
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
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

    const { email, password, confirmPassword } = formData;

    if (!email.trim() || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'La contraseña y la confirmación deben ser iguales.',
      });
      return;
    }

    setMessage({
      type: 'success',
      text: '¡Registro exitoso! Los datos son correctos.',
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
        <h2 className="mb-4 text-center">Registro</h2>

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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label d-block text-start">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Repite la contraseña"
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

export default Register;