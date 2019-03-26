import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../../config/api.config';
import {Observable} from 'rxjs';
import {CategoriaDto} from '../../models/categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(public http: HttpClient) {}
    findAll(): Observable<CategoriaDto[]> {
        console.log(`${API_CONFIG.baseUrl}/categorias`);
        return this.http.get<CategoriaDto[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}
