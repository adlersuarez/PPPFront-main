import { NavLink } from "react-router-dom";

const MatriculaExterna = () => {

    const idiomas = [
        {
            nombre: 'Inglés',
            icono: 'globe',
            color: 'blue',
            desc: 'El inglés es un idioma germánico occidental que se habla en todo el mundo. Es la lengua materna de al menos 360 millones de personas.',
            ejemplos: ['Hello, World!', 'How are you?', 'I love Upla.'],
        },
        {
            nombre: 'Francés',
            icono: 'globe',
            color: 'green',
            desc: 'El francés es una lengua romance que se habla en muchos países y es una de las lenguas oficiales de varias organizaciones internacionales.',
            ejemplos: ['Bonjour!', 'Comment ça va?', "J'adore sortir me promener."],
        },
        {
            nombre: 'Quechua',
            icono: 'globe',
            color: 'yellow',
            desc: 'El quechua es una familia de lenguas indígenas habladas principalmente en los Andes de América del Sur. Tiene una rica tradición cultural.',
            ejemplos: ['Sumaq kani!', 'Imaqa yachanichu?', 'Wasiqa yachanichu.'],
        },
        {
            nombre: 'Italiano',
            icono: 'globe',
            color: 'red',
            desc: 'El italiano es una lengua romance hablada principalmente en Italia y algunas regiones circundantes. Es conocida por su belleza y expresividad.',
            ejemplos:['Ciao!', 'Come stai?', 'Amo la bella Italia.'],
        },
        {
            nombre: 'Japonés',
            icono: 'globe',
            color: 'teal',
            desc: 'El japonés es un idioma aislado que se habla en Japón. Utiliza tres sistemas de escritura: kanji, hiragana y katakana.',
            ejemplos:  ['こんにちは！', 'お元気ですか？', '私はデザートが好きです。'],
        },
        {
            nombre: 'Portugués',
            icono: 'globe',
            color: 'indigo',
            desc: 'El portugués es una lengua romance hablada en Portugal, Brasil y otras antiguas colonias portuguesas. Es conocida por su musicalidad.',
            ejemplos: ['Olá!', 'Como você está?', 'Eu amo Brasil.'],
        },
    ]

    return (
        <>
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold mb-2">
                    Seleciones el idioma que desea aprender:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {idiomas.map((idioma, index) => (
                        <div key={index}>
                            <div className={`bg-${idioma.color}-500 text-white p-6 rounded-md shadow-lg mb-4`}>
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-semibold">
                                        <i className={`bi bi-${idioma.icono} mr-2`}></i> {idioma.nombre}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="mb-5">
                                        {idioma.desc}
                                    </p>
                                    <a 
                                    href="#" 
                                    className={`inline-block bg-white hover:bg-${idioma.color}-700 hover:text-white text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105`}
                                    >
                                        Matricularse a {idioma.nombre}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MatriculaExterna