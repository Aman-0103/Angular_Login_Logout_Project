import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthserviceService } from './authservice.service';


export const myrouteguardGuard: CanActivateFn = (route, state) => {
/*

Less boilerplate, more flexibility
Inject dependencies*/

  return inject(AuthserviceService).isUserLoggedIn?true:false
}



