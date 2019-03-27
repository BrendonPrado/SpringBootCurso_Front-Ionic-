import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../service/storage.service';
import {ClienteService} from '../../service/cliente.service';
import {ClienteDTO} from '../../models/cliente.dto';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.page.html',
  styleUrls: ['./page-profile.page.scss'],
})
export class PageProfilePage implements OnInit {



  cliente: ClienteDTO;

  constructor(public router: Router, public storage: StorageService, public clienteService: ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email ) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe( response => {
        this.cliente = response;
      }, error => {
        if (error.status == 403) {
          this.router.navigate(['/home']);

        }
      });
    } else {
      this.router.navigate(['/home']);

    }




  }



}
