import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForecastModel } from './models/forecast-model';
import { ForecastStore } from './store/forecast-store';


@Component({
  selector: 'app-dashboard-container',
  imports: [DashboardComponent],
  template: `<app-dashboard
      [forecast]="forecast()"
      [isLoading]="isLoading()"
      [hasLoaded]="hasLoaded()"
      [error]="error()"
      (cityChanged)="handleCityNameChanged($event)"
    ></app-dashboard>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DashboardContainerComponent implements OnInit {
  public forecast: Signal<ForecastModel | null> = signal<ForecastModel | null>(null);
  public isLoading: Signal<boolean> = signal<boolean>(false);
  public hasLoaded: Signal<boolean> = signal<boolean>(false);
  public error: Signal<Error | null> = signal<Error | null>(null);

  private store = inject(ForecastStore);

  public ngOnInit(): void {
    this.forecast = this.store.forecast;
    this.isLoading = this.store.isLoading;
    this.hasLoaded = this.store.hasLoaded;
    this.error = this.store.error;

    const cityName = this.store.searchedCity;
    this.store.loadForecastByCityName(cityName);
  }

  public handleCityNameChanged(name: string) {
    this.store.updateCityName(name);
  }
}
