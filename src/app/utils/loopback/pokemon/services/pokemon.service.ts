import { Injectable } from '@angular/core';
import { LoopBackService } from '../../base/services/persisted-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { LoopBackHttpResponse } from '../../base/models/loopback-http-response';
import { Abilities, Pokemon, PokemonDetail } from '../models/pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends LoopBackService {

  constructor(
    protected override http: HttpClient,
    protected override auth: AuthService
  ) {
    super(http, 'pokemons', auth);
  }

  getPokemons(): Observable<LoopBackHttpResponse<Pokemon>> {
    return this.http.get<LoopBackHttpResponse<Pokemon>>(`${this.getApiEndpoint()}/${this.resource}`)
  }

  getPokemonDetails(url: string): Observable<PokemonDetail>  {
    return this.http.get<PokemonDetail>(url)
  }

  getAbilities(pokemon: string): Observable<LoopBackHttpResponse<Abilities[]>> {
    return this.http.get<LoopBackHttpResponse<Abilities[]>>(`${this.getApiEndpoint()}/${this.resource}/habilidadesOcultas/${pokemon}`)
  }
}
