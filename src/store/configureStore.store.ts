import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.store'
import notifeSlice from './notifeSlice.store'
import infoEstudianteReducer from './estudianteSlice.store'
import infoPersonalReducer from './personalSlice.store'

 const store = configureStore({
  reducer: {
    autenticacion: authReducer,
    notificacion: notifeSlice,
    infoEstudiante: infoEstudianteReducer,
    infoPersonal: infoPersonalReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store