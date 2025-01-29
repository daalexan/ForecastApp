import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { ForecastModel } from '../../models/forecast-model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DatePipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    ProgressSpinnerModule,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public forecast = input<ForecastModel | null>();
  public isLoading = input<boolean>();
  public hasLoaded = input<boolean>();
  public error = input<Error | null>();

  public searchCityControl = new FormControl<string>('');

  public cityChanged = output<string>();

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchCityControl.valueChanges
    .pipe(
      filter(Boolean),
      debounceTime(700),
      takeUntilDestroyed(this.destroyRef),
      tap((name) => this.cityChanged.emit(name))
    ).subscribe();
  }
}
