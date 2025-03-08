import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { USER_TYPES } from "../../redux/actions/userAction";
import LoadMoreBtn from "../LoadMoreBtn";
import LoadIcon from "../../images/loading.gif";

const UsersEdicion = () => {
  const { homeUsers, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(homeUsers.users || []);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`users?limit=${homeUsers.page * 9}`, auth.token);
    dispatch({
      type: USER_TYPES.GET_USERS,
      payload: { ...res.data, page: homeUsers.page + 1 },
    });
    setLoad(false);
  };

  useEffect(() => {
    setFilteredUsers(homeUsers.users || []);
  }, [homeUsers.users]);

  const filteredResults = filteredUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleFilter = (criteria) => {
    let sortedUsers = [...homeUsers.users];

    switch (criteria) {
      
      
      case "mostReported":
        sortedUsers.sort((a, b) => (b.reportCount || 0) - (a.reportCount || 0));
        break;
      case "lastLogin":
        sortedUsers.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
        break;
      default:
        sortedUsers = homeUsers.users;
    }

    setFilteredUsers(sortedUsers);
  };

  return (
    <div>
      <div className="dropdown mb-3">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Filtrar Usuarios
        </button>
        <ul className="dropdown-menu">
             <li><button className="dropdown-item" onClick={() => handleFilter("mostReported")}>🚨 Más denunciados</button></li>
          <li><button className="dropdown-item" onClick={() => handleFilter("lastLogin")}>🔄 Últimos en iniciar sesión</button></li>
          <li><button className="dropdown-item" onClick={() => handleFilter("reset")}>🔄 Restablecer</button></li>
        </ul>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Registro</th>
            <th>Login</th>
                  <th>Reportes</th>
            <th>Reportado Por</th>
            <th>Última IP</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                   <td>{user.reportCount || 0}</td>
              <td>{user.reportedBy?.join(", ") || "N/A"}</td>
              <td>{user.lastIp || "Desconocida"}</td>
              <td>
                <div className="action-dropdown" style={{ position: "relative" }}>
                  <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Acción
                  </button>
                  <div className="dropdown-menu">
                    <button className="dropdown-item">✏️ Editar</button>
                    <button className="dropdown-item text-danger">🗑️ Eliminar</button>
                    <button className="dropdown-item text-warning">🚫 Bloquear</button>
                    <button className="dropdown-item text-warning">🔇 Silenciar</button>
                    <button className="dropdown-item">📩 Enviar mensaje</button>
                    <button className="dropdown-item">👤 Ver perfil</button>
                    <button className="dropdown-item">🚨 Ver reportes</button>
                    <button className="dropdown-item text-info">🔑 Iniciar sesión como usuario</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {load && <img src={LoadIcon} alt="loading" className="loading-icon" />}
      <LoadMoreBtn result={homeUsers.result} page={homeUsers.page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default UsersEdicion;