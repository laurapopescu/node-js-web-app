import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenPayload } from '../../interfaces/authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = { 
    email: '', 
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register() { 
    this.auth.register(this.credentials).subscribe(() => { 
      this.router.navigateByUrl('/profile');
    }, (err) => { 
      console.error(err);
    });
    
  }
}
