import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  getUserState(){
    return this.afAuth.authState;
  }

  createUser(user){
    this.afAuth.auth.createUserWithEmailAndPassword(user.userName, user.userPassword)
    .then(userCredential =>{
      this.newUser = user;
      userCredential.user.updateProfile({
        displayName: user.name
      })
      this.insertUserData(userCredential)
      .then(() => {
       this.router.navigate(['/profile'])
      })
      
    })
  
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/${userCredential.user.uid}`).set({
      name: this.newUser.userName,
      password: this.newUser.userPassword
    })
   
  }

  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.eventAuthError.next(error)
    })
    .then(userCredential => {
      if(userCredential) {
        this.router.navigate(['/profile'])
        
      }
    })
  }


}
