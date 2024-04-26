export interface RegistroEmpresaCarta {
    usuarioId: string
    estudianteId: string
    codigoOperacion: string
    fechaOperacion: string
    periodoId: number
    jsonEmpresa: {
        empresaRuc: string
        empresaNombre: string
        direccion: string
        depProvDist: string
        ubigeoEmpresa: string
    }
    jsonRepresentante: {
        gradoId: number
        cargoId: number
        repDni: string
        repNombres: string
        repApellidoPat: string
        repApellidoMat: string
    }
}
