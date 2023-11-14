import { useState } from 'react';
import Horario from "@/component/pages/horario/Horario"

const AgregarHorario = () =>  {

    const [data,SetData] = useState<object[]>([]);
    const [color,SetColor] = useState<object[]>([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Horario data={data} color={color} handleShow={handleShow}/>
        </>
    )
}
export default AgregarHorario