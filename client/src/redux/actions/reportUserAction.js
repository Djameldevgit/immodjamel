import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';

export const REPORT_TYPES = {
    CREATE_REPORT: 'CREATE_REPORT',
    GET_REPORTS: 'GET_REPORTS',
    LOADING_REPORT: 'LOADING_REPORT',
};

export const createReport = ({ auth, reportData }) => async (dispatch) => {

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        // Enviamos los datos del reporte al backend
        const res= await postDataAPI('reports', reportData, auth.token);

        // Despachamos la acción para guardar el reporte en el estado global
        dispatch({
            type: REPORT_TYPES.CREATE_REPORT,
            payload: res.data.report, // Suponiendo que el backend devuelve el reporte creado
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.msg || "Error al crear el reporte" },
        });
    }
};



export const getReports = (token) => async (dispatch) => {
    try {
        dispatch({ type: REPORT_TYPES.LOADING_REPORT, payload: true });

        // Obtenemos los reportes desde el backend
        const res = await getDataAPI('reports', token);
        console.log(res)
        // Despachamos la acción para guardar los reportes en el estado global
        dispatch({
            type: REPORT_TYPES.GET_REPORTS,
            payload: { ...res.data, page: 2 }
        });

        dispatch({ type: REPORT_TYPES.LOADING_REPORT, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.msg || "Error al obtener los reportes" },
        });
    }
};

