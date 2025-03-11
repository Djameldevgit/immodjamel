import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "../../redux/actions/reportUserAction";
 
const ReportedUsers = () => {
  const dispatch = useDispatch();
  const { reportReducer, auth } = useSelector((state) => state); // Obtener reportes y autenticación del estado global

  // Obtener los reportes cuando el componente se monta
  useEffect(() => {
    dispatch(getReports(auth.token));
  }, [dispatch, auth.token]);

  // Extraer los reportes del estado
  const { reports, loading } = reportReducer;

  return (
    <div className="reported-users">
      <h2>Usuarios Reportados</h2>

      {/* Mostrar un mensaje de carga si los datos están cargando */}
      {loading ? (
        <p>Cargando reportes...</p>
      ) : (
        <>
          {/* Mostrar un mensaje si no hay reportes */}
          {reports.length === 0 ? (
            <p>No hay usuarios reportados.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Usuario que Reporta</th>
                    <th>Usuario Reportado</th>
                    <th>Título del Post</th>
                    <th>Contenido del Post</th>
                    <th>Razón del Reporte</th>
                    <th>Fecha del Reporte</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report._id}>
                      <td>
                        <div className="user-info">
                          <img
                           
                            alt={report.userId.username}
                            className="user-avatar"
                          />
                          <span>{report.userId.username}</span>
                          <span>{report.postId._id.subCategory}</span>

                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <img
                           
                           
                            className="user-avatar"
                          />
                         
                        </div>
                      </td>
                     
                      <td>{report.reason}</td>
                      <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportedUsers;