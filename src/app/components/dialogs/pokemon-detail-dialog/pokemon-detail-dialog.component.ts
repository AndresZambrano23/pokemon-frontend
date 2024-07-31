import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Abilities, PokemonDetail } from '../../../utils/loopback/pokemon/models/pokemon.model';
import { PokemonService } from '../../../utils/loopback/pokemon/services/pokemon.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-pokemon-detail-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, CommonModule],
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrl: './pokemon-detail-dialog.component.scss'
})
export class PokemonDetailDialogComponent {

  isHidden: boolean = false;

  abilitiesData: Abilities[] = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PokemonDetail,
    public dialogRef: MatDialogRef<PokemonDetailDialogComponent>,
    private pokemonService: PokemonService
  ) {}

  abilities(pokemon: string) {
    if (this.isHidden) {
      this.isHidden = false;
    } else {
      this.pokemonService.getAbilities(pokemon).subscribe(res => {
        if (res.data && res.data.length > 0) {
          this.isHidden = true;
          this.abilitiesData = res.data
        }
      });
    }
  }
}
