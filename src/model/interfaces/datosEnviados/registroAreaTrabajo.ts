export default interface RegistroAreaTrabajo {
    jsonDatosJefe: {
        gradoId: number
        cargoId: number
        jefeDni: string
        jefeNombres: string
        jefeApellidoPat: string
        jefeApellidoMat: string
        jefeEmail: string
        jefeCelular: string
    }
    jsonAreaPractica: {
        direccionAreaPracticas: string
        depProvDist: string
        ubigeo: string
        descripcionAreaPracticas: string
    }
}