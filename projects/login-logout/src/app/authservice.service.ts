import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  isUserLoggedIn: boolean

  constructor(private rt :Router) { }

  login()
  {

    localStorage.setItem('isUserLoggedIn', "true")
    this.isUserLoggedIn=true

  }

  logout()
  {
    localStorage.setItem('isUserLoggedIn', "false")
    this.isUserLoggedIn=false
    this.rt.navigateByUrl("/login")

  }


}
