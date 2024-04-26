export const getCroppedImg_toB64 = async (imageSrc: string, crop: any) => {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    if (ctx) {
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }

    return new Promise<string>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Error al recortar la imagen.'));
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        resolve(reader.result);
                    } else {
                        reject(new Error('Error al convertir la imagen recortada.'));
                    }
                };
            },
            'image/jpeg',
            1
        );
    });
};


export async function getCroppedImg_toImg(
    imageSrc: string,
    pixelCrop: { width: number; height: number; x: number; y: number }
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    // Set canvas size to match the bounding box
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            } else {
                reject(new Error('Error al convertir la imagen recortada a blob.'));
            }
        }, 'image/png');
    });
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues
        image.src = url;
    });


///////////////////////////////////
export function obtenerInformacionImagenDATA64(cadenaImagen: string): void {
    // Convierte la cadena de datos en un Blob
    const byteCharacters = atob(cadenaImagen.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Cambia 'image/jpeg' según el tipo de imagen

    // Crea un objeto FileReader para leer la imagen
    const reader = new FileReader();

    // Define la función que se ejecutará cuando se cargue la imagen
    reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;

        // Define la función que se ejecutará cuando se cargue la imagen en el elemento <img>
        img.onload = () => {
            // Obtén el tamaño del archivo en bytes
            const fileSize = blob.size;

            // Obtén las dimensiones de la imagen en píxeles
            const imageWidth = img.width;
            const imageHeight = img.height;

            // Imprime la información en la consola
            console.log('Tamaño del archivo:', fileSize, 'bytes');
            console.log('Resolución de la imagen:', imageWidth, 'x', imageHeight, 'píxeles');
        };
    };

    // Lee el Blob como una URL de datos
    reader.readAsDataURL(blob);
}

export async function obtenerInformacionImagenURL(
    urlImagen: string,
    setSize: (size: number) => void,
    setResolucionX: (resolucionX: number) => void,
    setResolucionY: (resolucionY: number) => void
): Promise<void> {
    try {
        // Realiza una solicitud HTTP para obtener la imagen
        const respuesta = await fetch(urlImagen);
        const blob = await respuesta.blob();

        // Obtén el tamaño del archivo en bytes
        const fileSize = blob.size;

        // Crea una nueva instancia de la imagen
        const img = new Image();

        // Define la función que se ejecutará cuando se cargue la imagen
        img.onload = () => {
            // Obtén las dimensiones de la imagen en píxeles
            const imageWidth = img.width;
            const imageHeight = img.height;

            // Imprime la información en la consola
            setSize(fileSize)
            //console.log('Tamaño del archivo:', fileSize, 'bytes');
            //console.log('Resolución de la imagen:', imageWidth, 'x', imageHeight, 'píxeles');
            setResolucionX(imageWidth)
            setResolucionY(imageHeight)
        };

        // Define la función que se ejecutará si hay un error al cargar la imagen
        img.onerror = () => {
            console.error('Error al cargar la imagen desde la URL:', urlImagen);
        };

        // Asigna la URL de la imagen al objeto Image
        img.src = urlImagen;
    } catch (error) {
        console.error('Error al obtener información de la imagen:', error);
    }
}
