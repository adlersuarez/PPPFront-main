export interface RegistroEmpresaCarta {
    codigoOperacion: string
    fechaOperacion: string
    periodoId: number
    jsonEmpresa: {
        empresaRuc: string
        empresaNombre: string
        direccion: string
        depProvDist: string
        ubigeoEmpresa: string
        tipoEmpresaId: number
    }
    jsonRepresentante: {
        gradoId: number
        cargoId: number
        repDni: string
        repNombres: string
        repApellidoPat: string
        repApellidoMat: string

        repEmail: string
        repCelular: string
    }
}
