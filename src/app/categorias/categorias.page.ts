import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../service/domain/categoria.service';
import {CategoriaDto} from '../../models/categoria.dto';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  private categorias: Array<CategoriaDto> = new Array<CategoriaDto>();
  constructor(public categoriaService: CategoriaService) { }


  ngOnInit() {
    this.categoriaService.findAll().subscribe(response => {
      this.categorias = response;

    }, error => {
      console.log(error);
    });
  }




}
