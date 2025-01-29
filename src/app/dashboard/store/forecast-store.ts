import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, pipe, switchMap, tap } from 'rxjs';
import { ForecastModel } from '../models/forecast-model';
import { ForecastService } from '../services/forecast.service';


interface ForecastState {
  forecast: ForecastModel | null;
  searchedCity: string;
  isLoading: boolean;
  hasLoaded: boolean;
  error: Error | null;
};

const initialState: ForecastState = {
  forecast: null,
  searchedCity: '',
  isLoading: false,
  hasLoaded: false,
  error: null
};

export const ForecastStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    forecast: computed(() => store.forecast())
  })),
  withMethods((store, forecastService = inject(ForecastService)) => ({
    updateCityName(cityName: string): void {
      patchState(store, { searchedCity: cityName });
    },
    loadForecastByCityName: rxMethod<string>(
      pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, hasLoaded: false, error: null })),
        switchMap((cityName) => {
          return forecastService.getForecastByCityName(cityName).pipe(
            tapResponse({
              next: (response) => patchState(store, () => ({
                forecast: response,
                isLoading: false,
                hasLoaded: true
              })),
              error: (err: Error) => patchState(store, {
                forecast: null,
                isLoading: false,
                hasLoaded: true,
                error: err,
              })
            })
          );
        })
      )
    )
  }))
);
