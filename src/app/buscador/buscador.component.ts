import { Data } from '@angular/router';
import { PokemonClient } from 'pokenode-ts';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  @ViewChild('searchBar') searchBar!: ElementRef;
  nombrePokemon : string = 'Undefined';
  imagenPokemon : string | null= "";
  imagenPokemonShiny : any= "";
  imagenPokemonOriginal : any= "";
  showAlerta : boolean = false;
  estadisticasBase : any[] = [];
  hp : any = "";
  ataque : any = "";
  defensa : any = "";
  ataqueEspecial : any = "";
  defensaEspecial : any = "";
  velocidad : any = "";
  total : number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showAlerta = true;
  }

  buscarPokemon(pokemon : string) : void {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(pokemon.toLowerCase())
        .then((data) => {
          this.searchBar.nativeElement.value = "";
          this.nombrePokemon = data.name + " " + data.weight + " kg, exp.Base: " + data.base_experience;
          this.showAlerta = false;
          this.imagenPokemon = data.sprites.front_default;
          this.imagenPokemonShiny = data.sprites.front_shiny;
          this.imagenPokemonOriginal = data.sprites.other?.['official-artwork'].front_default;
          this.estadisticasBase = data.stats;
          this.total = 0;
          this.añadirStatsBase(data.stats);
        })
        .catch((error) => {
          console.error("Pokemon no encontrado " + pokemon);
          this.showAlerta = true;
        });
    })();
  }

  añadirStatsBase(stats: import("pokenode-ts").PokemonStat[]) {

    for (let i of stats) {

      if (i.stat.name == "hp") {
        this.hp = i.base_stat;
      }

      if (i.stat.name == "attack") {
        this.ataque = i.base_stat;
      }

      if (i.stat.name == "defense") {
        this.defensa = i.base_stat;
      }

      if (i.stat.name == "special-attack") {
        this.ataqueEspecial = i.base_stat;
      }

      if (i.stat.name == "special-defense") {
        this.defensaEspecial = i.base_stat;
      }

      if (i.stat.name == "speed") {
        this.velocidad = i.base_stat;
      }

      this.total = this.total + i.base_stat;
    }
  }

}
