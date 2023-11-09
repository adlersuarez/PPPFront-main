import { NavLink } from "react-router-dom";

type Props = {
    to: string,
    nombre: string,
}

const ButtonLink = (props: Props) => {
    return (

        <NavLink
            to={props.to}
            className={`
                flex 
                items-center 
                w-full
                p-2 
                text-sm 
                text-white
                font-semibold 
                transition-all 
                duration-200
                bg-gray-400
                hover:bg-blue-700
                rounded-lg
                uppercase 
                `}
        >
            <span className="mx-auto"> {props.nombre}</span>
        </NavLink>

    );

}

export default ButtonLink;