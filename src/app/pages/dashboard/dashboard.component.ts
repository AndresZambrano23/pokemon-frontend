import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../utils/loopback/pokemon/services/pokemon.service';
import { Pokemon } from '../../utils/loopback/pokemon/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PokemonDetailDialogComponent } from '../../components/dialogs/pokemon-detail-dialog/pokemon-detail-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  pokemons: Pokemon | undefined

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(res => {
      this.pokemons = res.data ? res.data : undefined
    });
  }

  viewDetails(url: string) {
    this.pokemonService.getPokemonDetails(url).subscribe(res => {
      this.dialog.open(PokemonDetailDialogComponent, {
        data: {
          abilities: res.abilities,
          name: res.name
        },
      });
    });
  }

}
