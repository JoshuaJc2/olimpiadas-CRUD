import Swal from 'sweetalert2';

export class SwalMessages{
    // muestra mensaje de confirmación
    successMessage(message: string){
        if(message == null){
            message = "No se pudo conectar con la base de datos";
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            color: '#fff',
            background: '#80AF81',
            showConfirmButton: false,
            timer: 2500
        });
    }
    // muestra mensaje de error
    errorMessage(message: string){
        if(message == null){
            message = "No se pudo conectar con la base de datos";
        }
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            color: '#fff',
            background: '#EE4E4E',
            showConfirmButton: false,
            timer: 2000
        });
    }
}