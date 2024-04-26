import { InfoPeriodo } from '@/model/interfaces/periodo/infoPeriodo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define el initialState para infoPersonal
const initialState: InfoPeriodo = {
    anioActual: "",
    periodoActual: "",
    periodoId: 0,
}

// Define el slice para infoPersonal
export const infoPersonalSlice = createSlice({
    name: 'infoPersonal',
    initialState,
    reducers: {
        loginDataPersonal: (state, action: PayloadAction<InfoPeriodo>) => {
            const infoPersonal = action.payload
            localStorage.setItem('infoPersonal', JSON.stringify(infoPersonal))
            Object.assign(state, infoPersonal)
        },
        logoutDataPersonal: () => {
            return initialState
        },
        restoreDataPersonal: (state, action: PayloadAction<InfoPeriodo>) => {
            const infoPersonal = action.payload
            Object.assign(state, infoPersonal)
        },
    },
})

export const { loginDataPersonal, logoutDataPersonal, restoreDataPersonal } = infoPersonalSlice.actions

export default infoPersonalSlice.reducer