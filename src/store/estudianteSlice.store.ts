import { InfoEstudiante } from '@/model/interfaces/estudiante/infoEstudiante';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define el initialState para InfoEstudiante
const initialState: InfoEstudiante = {
    est_Id: "",
    estudiante: "",
    email1: "",
    email2: "",
    celular: "",
    programa: "",
    sede: "",
    facultad: "",
    carrera: "",
    planEstudio: "",
    asi_Id: 0,
    asignatura: "",
    anioActual: "",
    periodoActual: "",
    periodoId: 0,
}

// Define el slice para infoEstudiante
export const infoEstudianteSlice = createSlice({
    name: 'infoEstudiante',
    initialState,
    reducers: {
        loginDataEstudiante: (state, action: PayloadAction<InfoEstudiante>) => {
            const infoEstudiante = action.payload
            localStorage.setItem('infoEstudiante', JSON.stringify(infoEstudiante))
            Object.assign(state, infoEstudiante)
        },
        logoutDataEstudiante: () => {
            return initialState
        },
        restoreDataEstudiante: (state, action: PayloadAction<InfoEstudiante>) => {
            const infoEstudiante = action.payload
            Object.assign(state, infoEstudiante)
        },
    },
})

export const { loginDataEstudiante, logoutDataEstudiante, restoreDataEstudiante } = infoEstudianteSlice.actions

export default infoEstudianteSlice.reducer