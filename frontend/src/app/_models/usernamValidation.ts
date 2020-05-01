
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MembershipService } from '../services/membership.service';

export function usernameStrengthVaidate(control: AbstractControl ,membershipService:MembershipService): ValidationErrors | null{
    
    
    let value: string = control.value || '';
    let usernameVaidate = '';
        console.log(value);
        if(!value){
            return null;
        }
        //else {
  
        //             return { usernameVaidate: `text has to contine special character` };
            
        
        // }
        membershipService.checkUsernameAvailable(value)
        .subscribe(
            response =>{
                    if(response == 1){
                        return { usernameVaidate: `text has to contine special character` };
                    }
            },
            error=>{
                if(error){
                    return null;                }
            }
        )

        return null;
    }
   

    // if(!value){
    //     return null
    // }else {
    //    this.MembershipService.checkUsernameAvailable(value)
    //     .subscribe(
    //         response=>{
    //             console.log(response);
    //             if(response ==1){
    //               Swal.fire('Oops...', 'username is Already inserted', 'error')
    //             }
    //           },
    //     )
    
