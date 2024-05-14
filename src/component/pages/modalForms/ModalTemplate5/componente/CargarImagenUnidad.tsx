import Modal from '@/component/pages/modal/ModalComponente';
import { formatoFecha_Date_String } from '@/helper/herramienta.helper';
import { getCroppedImg_toImg, obtenerInformacionImagenURL } from '@/helper/imagen.helper';
import React, { useState, ChangeEvent, useRef } from 'react';
import Cropper from 'react-easy-crop';
import toast from 'react-hot-toast';

type Props = {
    show: boolean
    hide: () => void
    fechaIni: string
    fechaFin: string
}

export const CargarImagenUnidad: React.FC<Props> = ({ show, hide, fechaIni, fechaFin }) => {

    const [image, setImage] = useState<string | null>(null)
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number } | null>(null)
    console.log(croppedAreaPixels)
    const [imgRecortada,setImgRecortada] = useState<string | null>(null)

    const tamanioMaxFile: number = 250000
    const [size, setSize] = useState<number>(0)
    const [resolucionX, setResolucionX] = useState<number>(0)
    const [resolucionY, setResolucionY] = useState<number>(0)

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        calcularSizeResol(croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
        console.log(croppedArea)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString())
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCrop = (crop: { x: number; y: number }) => {
        setCrop(crop);
    }

    const handleZoomChange = (zoom: number) => {
        setZoom(zoom);
    }


    // const [imgRecortada, setImgRecortada] = useState<string | null>(null)

    const calcularSizeResol = async (croppedAreaPixels: { width: number; height: number; x: number; y: number }) => {
        if (croppedAreaPixels && image) {
            //const croppedImage = await getCroppedImg_toB64(image, croppedAreaPixels)
            //console.log('Imagen recortada:', croppedImage)
            //BASE 64
            //obtenerInformacionImagenDATA64(croppedImage)
            const cropPASD = await getCroppedImg_toImg(image, croppedAreaPixels)
            //console.log(cropPASD)
            setImgRecortada(cropPASD)
            obtenerInformacionImagenURL(cropPASD ?? '', setSize, setResolucionX, setResolucionY)
        }
    }

    const closeModal = () => {
        hide()
        limpiar()
    }

    const limpiar = () => {
        setImage(null)
        setSize(0)
        setResolucionX(0)
        setResolucionY(0)
    }

    //Alineacion de la imagen
    const [alineacion, setAlineacion] = useState<number>(4 / 3)

    const setHorizontal = () => setAlineacion(4 / 3)
    const setVertical = () => setAlineacion(3 / 4)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleGuardarImagen = () => {
        if (size > tamanioMaxFile) {
            toast.error('El tamaño actual de la imagen supera el máxmimo permitido')
        }

        //// Logica para subir la imagen
    }

    ////////////
    const [step, setStep] = useState<number>(0);

    const nextStep = () => setStep(1)
    const prevStep = () => setStep(0)

    //PASO 2
    const [date, setDate] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    console.log(imgRecortada)

    return (

        <Modal onShow={show} maxWidth='max-w-5xl'>
            <Modal.Header closeButton onHide={closeModal}>
                {step == 0 &&
                    <div className='text-sm flex ml-2 py-1'>
                        <button className={`w-32 p-1 px-2 border ${alineacion === 4 / 3 ? 'bg-upla-100 border-upla-100 text-white font-semibold' : 'border-gray-400 text-gray-500'} hover:scale-105 hover:bg-gray-400 hover:border-gray-400 hover:text-white `}
                            onClick={setHorizontal}
                        > <i className="bi bi-card-image mr-2" /> Horizontal
                        </button>
                        <button className={`w-32 p-1 px-2 border ${alineacion === 3 / 4 ? 'bg-upla-100 border-upla-100 text-white font-semibold' : 'border-gray-400 text-gray-500'} hover:scale-105 hover:bg-gray-400 hover:border-gray-400 hover:text-white `}
                            onClick={setVertical}
                        > <i className="bi bi-file-image mr-2" />Vertical
                        </button>
                    </div>
                }
            </Modal.Header>
            <Modal.Body>
                {step == 0 &&
                    <div className="flex flex-col h-full sm:h-[500px] gap-6 rounded-md overflow-hidden bg-gray-600">
                        {/*<img src={imgRecortada ?? ''} className='hidden h-40 w-40 object-cover' />*/}
                        {image ? (
                            <div className="relative h-96 sm:h-[500px]">
                                <button
                                    onClick={limpiar} title='Quitar imagen'
                                    className="absolute top-2 right-2 z-50 bg-gray-400 hover:bg-red-500 hover:scale-110 text-white rounded-full text-x w-6 h-6 ml-auto inline-flex justify-center items-center"
                                >
                                    <i className="bi bi-trash3 text-xs" />
                                </button>

                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={alineacion}
                                    onCropChange={handleCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={handleZoomChange}
                                />
                            </div>
                        )
                            :
                            <div className='flex h-96 sm:h-[500px] m-auto'>
                                <div onClick={() => inputRef.current?.click()} role='button' title='Seleccionar imagen'
                                    className='m-auto text-center text-lg gap-8 text-white flex flex-col border-2 border-dashed p-16 py-8 rounded-2xl hover:scale-105 hover:bg-gray-800 hover:font-semibold'
                                >
                                    {alineacion === 4 / 3 && <i className="bi bi-card-image text-7xl" />}
                                    {alineacion === 3 / 4 && <i className="bi bi-file-image text-7xl" />}

                                    <span> Selecccione una imagen</span>

                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs'>Formatos
                                            <span className='ml-2 text-sm font-medium'>JPG</span>, <span className='text-sm font-medium'>JPEG</span> y <span className='text-sm font-medium'>PNG</span>
                                        </span>
                                        <span className='text-xs'>Tamaño máximo
                                            <span className='ml-2 text-sm font-medium'>{tamanioMaxFile / 1000} KB * (especificar)</span>

                                        </span>
                                    </div>

                                </div>
                                <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} className='hidden' />
                            </div>
                        }

                    </div>
                }
                {step == 1 &&
                    <div className="flex flex-col sm:flex-row h-full sm:h-[500px] rounded-md overflow-hidden">
                        <div className='flex flex-col border-r border-r-gray-400 pr-4 justify-between'>
                            <div className='font-bold text-gray-500'>Imagen Actividad</div>
                            <div className='flex w-[450px] h-[450px] aspect-square bg-gray-100'>
                                <img src={imgRecortada??''} alt="Actividades de las prácticas"
                                    className={`m-auto rounded-md bg-green-100 border ${alineacion === 3 / 4 ? 'max-h-full aspect-[3/4]' : 'max-w-full aspect-[4/3]'}`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col bg-blue-50 flex-grow gap-4 pl-4'>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="date" className="font-bold text-gray-500">Fecha <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    min={formatoFecha_Date_String(fechaIni)}
                                    max={formatoFecha_Date_String(fechaFin)}
                                    value={date}
                                    onChange={handleDateChange}
                                    className="w-40 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-1 flex-grow ">
                                <label htmlFor="description" className="font-bold text-gray-500">Descripción <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full h-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm resize-none"
                                    rows={4}
                                    placeholder='Ejm: Participé activamente en...'
                                />
                            </div>
                        </div>

                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                <div className={`w-full flex flex-col sm:flex-row gap-4 ${step == 0 ? 'justify-between' : 'justify-end'} `}>
                    {step == 0 &&
                        <div className='flex flex-col gap-1'>
                            <div className='text-sm'>
                                Dimensiones: <span className='ml-2 text-upla-100 font-medium'>{(resolucionX !== 0 && resolucionY !== 0) && resolucionX + ' x ' + resolucionY}</span>
                            </div>
                            <div className='text-sm flex'>
                                Tamaño: <span className='ml-3 text-upla-100 font-medium'>{size !== 0 && (size / 1000).toFixed(0) + ' KB'}</span>
                                {
                                    size != 0 &&
                                    (
                                        size <= tamanioMaxFile ?
                                            <i className="ml-2 bi bi-check-circle text-green-400" title='Válido' />
                                            :
                                            <i className="ml-2 bi bi-x-circle text-red-400" title='No válido' />
                                    )
                                }

                            </div>
                        </div>
                    }
                    <div className="flex gap-4">
                        {step == 0 &&
                            <button onClick={nextStep} title='Siguiente paso'
                                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-800 text-white  py-2 px-4 rounded">
                                Siguiente <i className="ml-2 bi bi-arrow-right" />
                            </button>
                        }

                        {step == 1 &&
                            <button onClick={prevStep} title='Anterior paso'
                                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-800 text-white  py-2 px-4 rounded">
                                <i className="mr-2 bi bi-arrow-left" /> Volver
                            </button>
                        }

                        {step == 1 &&
                            <button onClick={handleGuardarImagen}
                                className="w-full sm:w-auto bg-green-500 hover:bg-green-700 hover:scale-110 text-white py-2 px-4 rounded">
                                Guardar <i className="ml-2 bi bi-floppy" />
                            </button>
                        }

                    </div>
                </div>

            </Modal.Footer>
        </Modal>
    );
};
