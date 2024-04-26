import { useRef } from "react";
//@ts-ignore
import Swal from "../../assets/js/sweetalert.js";
import Sweet from "../../model/interfaces/Sweet.mode.interface";


const useSweet = (): Sweet => {

    const alert = useRef(Swal());

    const openInformation = (title: string, message: string) => {
        alert.current({
            title: `<span class="text-info">${title}</span>`,
            text: message,
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    };

    const openSuccess = (title: string, message: string, callback = function () { }) => {
        const result = alert.current({
            title: `<span class="text-success">${title}</span>`,
            text: message,
            type: "success",
            showConfirmButton: false, //Ocultar el botón
            allowOutsideClick: false,
            timer: 2500, //Añadirle Tiempo
           
        });

        if (result instanceof Promise) {
            result.then(() => {
                callback();
            });
        }
    };

    const openWarning = (title: string, message: string, callback = function () { }) => {
        const result = alert.current({
            title: `<span class="text-warning">${title}</span>`,
            text: message,
            type: "warning",
            showConfirmButton: true,
            allowOutsideClick: false,
        });

        if (result instanceof Promise) {
            result.then(() => {
                callback();
            });
        }
    };

    const openError = (title: string, message: string) => {
        alert.current({
            title: `<span class="text-error">${title}</span>`,
            text: message,
            type: "error",
            showConfirmButton: true,
            allowOutsideClick: false,
        });
    };

    const openDialog = (title: string, message: string, callback: (value: boolean) => void) => {
        const result = alert.current({
            title: `<span class="text-question">${title}</span>`,
            text: message,
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            allowOutsideClick: false,
        });

        if (result instanceof Promise) {
            result.then((isConfirm: any) => {
                if (isConfirm.value === undefined) {
                    callback(false);
                    return;
                }
                if (isConfirm.value) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        }
    }

    return {
        alert: alert.current,
        openInformation,
        openSuccess,
        openWarning,
        openError,
        openDialog
    };
}

export default useSweet;