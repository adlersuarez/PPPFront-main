import Swal from 'sweetalert2'

 const  Alerta=() =>{
    const Mensaje = Swal.mixin({
        confirmButtonColor: '#0ca6eb',
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        
        denyButtonColor: '#bd8600',
    })
  return (
    Mensaje
  )
}

export default Alerta
