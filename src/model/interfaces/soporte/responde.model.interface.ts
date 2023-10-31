import Respuesta from "./respuesta.model.interface";
import ListarConsulta from "./listarconsulta.model.interfaces";
import Frecuente from "./frecuente.model.interfaces";
import Persona from "../ingreso/persona.model.interface";

export default interface Responde {
    resultado : ListarConsulta[] | Respuesta[] | Frecuente[] | Persona[],
    total: number
}