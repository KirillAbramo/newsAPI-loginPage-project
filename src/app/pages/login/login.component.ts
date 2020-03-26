import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: firebase.User;
  authError: any;
  userNameText: string;
  userNameAvailable: boolean;
  

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user
    })

    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }

  createUser(frm){
    this.auth.createUser(frm.value)
    
  }

  login(frm){
    this.auth.login(frm.value.email, frm.value.password)
    frm.reset()
  }


}
