const Profile = () => {
  const user = {
    name: 'Usuario Mamma Mia',
    email: 'usuario@mammamia.com',
    role: 'Cliente',
  };

  const handleLogout = () => {
    alert('Sesión cerrada');
  };

  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body text-center">
          <h2 className="mb-3">Perfil</h2>
          <p className="mb-2"><strong>Nombre:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-3"><strong>Rol:</strong> {user.role}</p>

          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
