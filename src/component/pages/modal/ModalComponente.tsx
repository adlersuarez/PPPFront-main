import { useState, useEffect, ReactNode } from 'react'

type ModalProps = {
    children: ReactNode
    onShow: boolean
    onHide?: () => void
    maxWidth?: string
}

const Modal = ({ children, onShow, maxWidth }: ModalProps) => {

    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        setShowModal(onShow)
    }, [onShow])

    return (
        <>
            {showModal && (
                <div
                    id="defaultModal"
                    tabIndex={-1}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 overflow-y-auto"
                //onClick={handleModalClick}
                >
                    <div className={`relative w-full ${maxWidth ? `${maxWidth}` : 'max-w-3xl'} max-h-full`}>
                        <div className="bg-white sm:rounded-lg shadow dark:bg-gray-700">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

type HeaderProps = {
    children: ReactNode
    closeButton?: boolean
    onHide: () => void
}

const Header = ({ children, closeButton, onHide }: HeaderProps) => {
    return (
        <div className="w-full custom-header flex items-center justify-between p-2 border-b rounded-t dark:border-gray-800">
            <div>{children}</div>

            {closeButton && (
                <button
                    onClick={onHide} title='Cerrar'
                    className="text-gray-400 bg-transparent hover:bg-red-400 hover:text-white  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            )}
        </div>
    )
}

const Body = ({ children }: { children: ReactNode }) => {
    return <div className="p-4">{children}</div>
}

const Footer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
            {children}
        </div>
    )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal