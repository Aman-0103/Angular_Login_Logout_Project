import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { AuthserviceService } from '../authservice.service';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";


// ActivateRoute - It carries all the active route information
// Router - It provide nevigation on the desired path

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  submitted=false
  type: string = "password"
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash"


  form:FormGroup = new FormGroup({
    nm: new FormControl(),
    usrnm: new FormControl(),
    pwd: new FormControl(),
    emailid: new FormControl(),
    cnfmpwd: new FormControl(),
})

  constructor(private frmbuilder : FormBuilder, private activert : ActivatedRoute, private route : Router, private serv1 : MyserviceService, private authser : AuthserviceService){}

  ngOnInit()
  {
    this.form = this.frmbuilder.group({
      nm:['', [Validators.required, Validators.minLength(6)]],
      usrnm:['', [Validators.required, Validators.minLength(6), this.usercustomname()]],
      emailid:['', [Validators.required, Validators.email]],
      pwd:['', [Validators.required, Validators.minLength(6)]],
      cnfmpwd:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit()
  {
    this.submitted=true

    const nm1 = this.form.controls['nm'].value
    const usrnm1 = this.form.controls['usrnm'].value
    const emailid1 = this.form.controls['emailid'].value
    const pwd1 = this.form.controls['pwd'].value
    const cnfmpwd1 = this.form.controls['cnfmpwd'].value


    const data = {nm: nm1 ,usrnm: usrnm1, emailid: emailid1, pwd: pwd1, cnfmpwd: cnfmpwd1}

    if(this.serv1.userobj.length > 0)
      {
      this.serv1.userobj.push(data);
      alert("New User is registered ! ")

      console.log(this.serv1.userobj)
      this.route.navigate(['/login']);
      }

    else
      alert("User Details are Invalid !!!")
  }

  usercustomname()
  {
    return (ctrl:AbstractControl) : ValidationErrors | null =>
    {
      var regexpression = /^[a-zA-Z0-9]+$/
      if( ! regexpression.test(ctrl.value))
      {
        return {usernotmatch:true}
      }
      return null
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" :this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  get func():{[m:string]:AbstractControl}
  {
      return this.form.controls;
  }

  id = "tsparticles";

    /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
    particlesUrl = "http://foo.bar/particles.json";

    /* or the classic JavaScript object */
    particlesOptions = {
        background: {
            color: {
                value: "#6e6ef6",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.push,
                },
                onHover: {
                    enable: true,
                    mode: HoverMode.repulse,
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 6,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }

}
