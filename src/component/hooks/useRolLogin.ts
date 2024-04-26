import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';


const useRolLogin = () => {
    const tokens = useSelector((state: RootState) => state.autenticacion.token)
    //const [codigoRolToken, setRolLoginToken] = useState<string[]>([])
    const [isCoordinador, setIsCoordinador] = useState<boolean>(false)

    useEffect(() => {
        if (tokens) {
            const decodedToken: any = jwtDecode(tokens ?? '')

            const codigoLoginFromToken: string[] = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? []
            const practicasLoginRoles: string[] = Array.from(codigoLoginFromToken).filter(valor => valor === 'PracticaCoordinador')
            //setRolLoginToken(codigoLoginFromToken)
            setIsCoordinador(practicasLoginRoles.length !== 0)
        } else {
            //setRolLoginToken([])
            setIsCoordinador(false)
        }
    }, [tokens])

    //return codigoRolToken
    return isCoordinador
}

export default useRolLogin