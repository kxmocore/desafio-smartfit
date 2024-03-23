import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from 'src/app/types/location.interface';
import { FilterUnitsService } from 'src/app/services/filter-units.service';





@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private unitService: GetUnitsService, 
    private filtersUnitService: FilterUnitsService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    })

    this.unitService.getAllUnits().subscribe(data => {
      this.results = data
      this.filteredResults = data
    });
  }



  onSubmit(): void {
    let {showClosed, hour} = this.formGroup.value
    this.filteredResults = this.filtersUnitService.filter(this.results, showClosed, hour)
    this.unitService.setFilteredUnits(this.filteredResults)

    this.submitEvent.emit();
  }

  onClean(): void {
    this.formGroup.reset();
  }

}

