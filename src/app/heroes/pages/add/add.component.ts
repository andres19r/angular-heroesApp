import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  save(): void {
    if (this.hero.superhero.trim().length === 0) return;
    if (this.hero.id) {
      this.heroesService
        .updateHero(this.hero)
        .subscribe((hero) => this.showSnackBar('updated record'));
    } else {
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar('created record');
      });
    }
  }

  deleteHero(): void {
    this.dialog.open(ConfirmComponent, {
      width: '250px'
    });
    // this.heroesService
    //   .deleteHero(this.hero.id!)
    //   .subscribe((resp) => this.router.navigate(['/heroes']));
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: 2500 });
  }
}
