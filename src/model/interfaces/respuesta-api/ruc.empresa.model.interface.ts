import Empresa from "../empresa.model.interface";

export default interface RucEmpresa{
    success: boolean,
    data: Empresa | undefined
}