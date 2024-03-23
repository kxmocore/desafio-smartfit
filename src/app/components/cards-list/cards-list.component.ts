import { Component, Input } from '@angular/core';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent{
  @Input() unitsList: Location[] = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.unitsList)
  }
}
