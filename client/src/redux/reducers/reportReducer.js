import { REPORT_TYPES } from "../actions/reportUserAction";

 
const initialState = {
    loading: false,
    reports: [],
    result: 0,
    page: 2

};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_TYPES.LOADING_REPORT:
            return {
                ...state,
                loading: action.payload,
            };
        case REPORT_TYPES.CREATE_REPORT:
            return {
                ...state,
                reports: [action.payload, ...state.reports], // Agrega el nuevo reporte al inicio
            };
        case REPORT_TYPES.GET_REPORTS:
            return {
                ...state,
             
                reports: action.payload.reports,
                result: action.payload.result,
                page: action.payload.page // Guarda la lista de reportes
            };
        default:
            return state;
    }
};

export default reportReducer;