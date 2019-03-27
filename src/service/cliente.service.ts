import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_CONFIG} from '../config/api.config';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {ClienteDTO} from '../models/cliente.dto';

@Injectable()
export class ClienteService {

    constructor(public  http: HttpClient, public storage: StorageService) {}

    findByEmail(email: string): Observable<ClienteDTO> {

        const token = this.storage.getLocalUser().token;
        const authHeader = new HttpHeaders({'Authorization': `Bearer ${token}`});

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`, {
            'headers': authHeader
        });
    }
}
