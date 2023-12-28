// import { ArrowRightOnCicleSvg } from "@/component/Svg.component";
// import { NavLink } from "react-router-dom";
import Card from "../../component/pages/cards/CardDash"
import { Vida, Matricula } from '../../component/Iconos';

const HomeEstudiante = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Matricula />}
                    titulo={'Matrícula'}
                    subTitulo={'Realiza tu matrícula.'}
                    color={'green'}
                    to={'/inicio/matricula-interna'}
                    info={''}
                />
            </div>
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Vida />}
                    titulo={'Vida académica'}
                    subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                    color={'yellow'}
                    to={'/inicio/vida-academica'}
                    info={''}
                />
            </div>
        </div>
    );
};

export default HomeEstudiante;
