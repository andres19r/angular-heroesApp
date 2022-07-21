import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Hero[] = [];
  heroSelected!: Hero;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  searching() {
    this.heroesService
      .getSuggestions(this.term)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;
    this.term = hero.superhero;
    this.heroesService
      .getHeroById(hero.id!)
      .subscribe((hero) => (this.heroSelected = hero));
  }
}
