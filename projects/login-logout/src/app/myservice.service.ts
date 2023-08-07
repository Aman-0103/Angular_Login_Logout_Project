import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  userobj = [{nm:'aman kumar', usrnm:'aman1234', emailid:'aman1234@abc.com', pwd:'123456', cnfmpwd:'123456'},
    {nm:'coderk', usrnm:'coder1234', emailid:'coder1234@abc.com', pwd:'123456', cnfmpwd:'123456'}]

}
