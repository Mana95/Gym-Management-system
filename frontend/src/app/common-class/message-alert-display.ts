
import Swal from 'sweetalert2/dist/sweetalert2.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
export class MessageAlertDisplay {

    static SuccessToastMessage(message , open:boolean=false ,icon=undefined) {
        
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: (icon==undefined)?'success':icon,
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
static loadingSpinner(isBoolean:boolean = false) {
  let timerInterval
  Swal.fire({
    title: 'Please wait!',
    html: 'wait for print the membership card',
    timer: 2000,
    timerProgressBar: true,
    willOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      if(isBoolean){
        return true;
      }else{
        return false
      }
    }
  })
  return false
}

static confirmationMessage(message:string = null , confrimButtonText:string = null , icon:string =null){
  return (Swal.fire({
    title: 'Are you sure?',
    text: (message==null)? "You won't be able to revert this!":message,
    icon:(icon==null)? "warning":icon, 
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: (confrimButtonText==null)? 'Yes, delete it!':confrimButtonText
  }));

}





}