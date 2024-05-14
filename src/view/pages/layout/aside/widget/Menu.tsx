//import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type Props = {
    pathname: string
    icon: string
    nombre: string
    to: string
}

const Menu = (props: Props) => {
    return (
        <li className="">
            <NavLink
                to={props.to}
                className={`${props.to === props.pathname ? "bg-upla-100 text-white" : "hover:bg-gray-500"}
                flex 
                items-center 
                p-3 px-6
                text-sm 
                font-normal 
                text-gray-400                    
                transition-all 
                duration-200
                hover:text-white
                
                `}
            >
                <i className={`bi ${props.icon} text-xl pr-4`} ></i>
                <span className="my-auto"> {props.nombre}</span>
            </NavLink>
        </li>
    )
}

export default Menu