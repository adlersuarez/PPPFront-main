interface Notas {
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    TI: string;
    Py: string;
    EP: string;
}

interface Paso8Props {
    notas: Notas;
    onNotaChange: (key: keyof Notas, value: string) => void;
}

const Paso8: React.FC<Paso8Props> = ({ notas, onNotaChange }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-8-square-fill`} />
                <h1 className="font-bold">EVALUACIÓN</h1>
            </div>
            <div className="flex">
                
                <div className="grid grid-cols-2 gap-4 mx-auto text-gray-400 text-lg sm:text-xl">
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">P1:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.P1}
                        onChange={(e) => onNotaChange('P1', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">P2:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.P2}
                        onChange={(e) => onNotaChange('P2', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">P3:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.P3}
                        onChange={(e) => onNotaChange('P3', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">P4:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.P4}
                        onChange={(e) => onNotaChange('P4', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">TI:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.TI}
                        onChange={(e) => onNotaChange('TI', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">Py:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.Py}
                        onChange={(e) => onNotaChange('Py', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex items-center">
                        <i className="bi bi-file-text-fill mr-4" />
                        <p className="">EP:</p>
                    </div>
                    <input
                        type="text"
                        value={notas.EP}
                        onChange={(e) => onNotaChange('EP', e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Paso8;