import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';


const useCodigoLogin = () => {
    const tokens = useSelector((state: RootState) => state.autenticacion.token)
    const [codigoLoginToken, setCodigoLoginToken] = useState<string | null>(null)

    useEffect(() => {
        if (tokens) {
            const decodedToken: any = jwtDecode(tokens ?? '')
            //const codigoLoginFromToken: string = decodedToken["docNumId"];

            const codigoLoginFromToken: string = decodedToken?.docNumId ?? ''

            setCodigoLoginToken(codigoLoginFromToken)
        } else {
            setCodigoLoginToken(null)
        }
    }, [tokens])


    return codigoLoginToken 
}

export default useCodigoLogin