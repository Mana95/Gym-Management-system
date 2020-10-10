
import Swal from 'sweetalert2/dist/sweetalert2.js';

export class MessageAlertDisplay {

    static SuccessToastMessage(message) {
        
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: message
      })
    }
//validation failed
static errorMessage() {
    Swal.fire({
        title: `Form validation failed`,
        icon: 'error'})
}

static responseErrorMessage(message) {
    Swal.fire({
        title: message,
        icon: 'error'})
}

}