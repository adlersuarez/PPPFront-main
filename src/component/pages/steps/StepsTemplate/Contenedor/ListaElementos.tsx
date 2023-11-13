import EstadoElementos from "./EstadoElementos";

type ListaElementosProps = {
    titulo: string;
    elementos: ElementosLista[] | undefined;
}

type ElementosLista = {
    descripcion: string;
    estado?: number;
}

const ListaElementos = ({ titulo, elementos }: ListaElementosProps) => {
    //console.log(elementos)

    return (
        <div className="flex flex-col v">
            <h2 className="font-bold text-gray-500 text-lg">{titulo}</h2>
            <ul className="list-disc">
                {
                    elementos?.map((elemento, index) => (
                        <div key={index} className="flex gap-2">
                            <li className="mb-1 ml-8">
                                {elemento.descripcion}
                            </li>
                            <EstadoElementos
                                estado={elemento.estado}
                            />
                        </div>

                    ))}
            </ul>
        </div>
    );
};

export default ListaElementos;