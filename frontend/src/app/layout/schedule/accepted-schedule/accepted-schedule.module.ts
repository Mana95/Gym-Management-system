import { NumberDirective } from './../../../_directives/numbers-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcceptedScheduleRoutingModule } from './accepted-schedule-routing.module';
import { AcceptedScheduleComponent } from './accepted-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierOptions, NotifierModule } from 'angular-notifier';


/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};



@NgModule({
  declarations: [AcceptedScheduleComponent ,NumberDirective],
  imports: [
    CommonModule ,AcceptedScheduleRoutingModule, ReactiveFormsModule ,NgbModule , NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class AcceptedScheduleModule { 




  
}
