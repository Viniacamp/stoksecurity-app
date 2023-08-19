import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) { }

  async click(email: string): Promise<boolean> {
  try {
    const methods = await this.afAuth.fetchSignInMethodsForEmail(email);
    if (methods.length === 0) {
      // o e-mail não está cadastrado no Firebase
      return false;
    } else {
      // o e-mail está cadastrado no Firebase
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}




  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      // redirecione para a página de login ou para a página inicial da aplicação
    } catch (e) {
      console.log(e);
    }
  }

}
