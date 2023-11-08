//import { respuesta } from '@/model/types/respuesta';
//import { useEffect, useState } from 'react'
//import { getMorti } from './rest/api';
//import { morti } from '@/model/types/morti.mode.';
//import { useDispatch } from 'react-redux';
//import { setLoading } from '@/store/slices/general';
//import { Alerta } from '../components/Alerta';

const index = () => {    
    //const dispatch = useDispatch();
    //const msj = Alerta()
    //const [mortis, setMortis] = useState<morti[]>([]);

    /*useEffect(() => {        
        const getMortis = async () => {
            dispatch(setLoading(true));
            const response = await getMorti<respuesta<morti>>();  

            //console.log(response)
            
            if(response.codigo==200)
                setMortis(response.entidad);            
            else
                msj.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sucedio algun error',                    
                  })
        } 
        getMortis();        
      dispatch(setLoading(false));
    }, [])*/
    
  return (
    <div className='text-green-300 font-bold text-5xl'>
        {/*
            mortis.length>0
            ?
            mortis.map((item:morti,index)=>
                <div key={index}>
                    {item.nomParticipante}
                </div>
            )
            :
            <div>No hay datos</div>
  */}
    </div>
  )
}

export default index