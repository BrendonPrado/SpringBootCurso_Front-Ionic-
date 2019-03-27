import { Component } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {CredenciaisDTO} from '../../models/credenciais.dto';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public menuCtrl: MenuController, public auth: AuthService, public router: Router) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  ionViewDidEnter() {
    this.auth.refreshToken()
        .subscribe(response => {
      this.auth.succesfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/categorias']);
    },
                error => console.log(error));
  }

  logar() {
    this.auth.authenticate(this.creds)
        .subscribe(response => {
      this.auth.succesfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/categorias']);

      }
      , error => console.log(error));
  }


}
