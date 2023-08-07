import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { AuthserviceService } from '../authservice.service';
import { loadFull } from "tsparticles";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false
  log=false;
  type: string = "password"
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(private frmbuild: FormBuilder, private serv : MyserviceService,  private route : Router, private authser : AuthserviceService){}

  form: FormGroup = new FormGroup({
    usrnm: new FormControl(),
    emailid: new FormControl(),
    pwd: new FormControl(),

  })

  onSubmit(){
    this.submitted = true;

    const data = this.serv.userobj.filter(
      m => (m.usrnm === this.form.controls['usrnm'].value) && (m.emailid === this.form.controls['emailid'].value) && (m.pwd === this.form.controls['pwd'].value)
    )

    if(data.length > 0)
      {
        const dt :string  = data[0]['usrnm'];
        this.authser.login();
        if(this.authser.isUserLoggedIn)
        this.route.navigateByUrl('/home?username=' + dt)
      }

      else
        alert("Not a Valid User !!!")
  }

  ngOnInit()                       // hook function called only one time in component
  {
    this.form = this.frmbuild.group({
      usrnm:['', [Validators.required, Validators.minLength(6), this.usercustomname()]],
      emailid:['', [Validators.required, Validators.email]],
      pwd:['', [Validators.required, Validators.minLength(6)]]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" :this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  get func():{[key:string]:AbstractControl}
  {
    return this.form.controls;
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
