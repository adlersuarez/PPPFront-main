import Persona from "../persona.model.interface";

export default interface DniPersona{
    success: boolean,
    data: Persona | undefined
}