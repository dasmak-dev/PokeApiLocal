import { Component, OnInit } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  nombrePokemon : string = 'Undefined';
  showAlerta : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  buscarPokemon(pokemon : string) : void {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(pokemon)
        .then((data) => {
          console.log(data.name);
          this.nombrePokemon = data.name + ", Peso: " + data.weight + " Kg, EXP.Base: " + data.base_experience;
          this.showAlerta = false;
        }) // will output "Luxray"
        .catch((error) => {
          console.error("Pokemon no encontrado " + pokemon);
          this.showAlerta = true;
        });
    })();
  }

}
