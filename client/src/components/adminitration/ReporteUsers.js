import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../redux/actions/reportUserAction';

const ReportedUsers = () => {
    const dispatch = useDispatch();
    const { reportReducer, auth } = useSelector(state => state); // Obtener reportes y autenticación del estado global

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
                        <ul>
                            {reports.map((report) => (
                                <li key={report._id}>
                                    <div>
                                        <strong>Usuario:</strong> {report.userId.username}
                                    </div>
                                    <div>
                                        <strong>Post:</strong> {report.postId.content}
                                    </div>
                                    <div>
                                        <strong>Razón:</strong> {report.reason}
                                    </div>
                                    <div>
                                        <strong>Fecha:</strong> {new Date(report.createdAt).toLocaleDateString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default ReportedUsers;