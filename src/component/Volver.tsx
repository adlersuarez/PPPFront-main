import { useNavigate } from "react-router-dom";

const Volver = () => {

    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(-1)} title="Atrás" role="button" className="my-auto">
            <i className="bi bi-arrow-left-circle-fill hover:text-blue-500" />
        </span>
    )
}

export default Volver
