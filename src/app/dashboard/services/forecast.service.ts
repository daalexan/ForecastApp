import { inject, Injectable } from '@angular/core';
import { WEATHER_API_CONSTANTS } from '../../core/constants/weather-api-constants';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ForecastApiModel, ForecastModel, WeatherDetails } from '../models/forecast-model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private http = inject(HttpClient);

  public getForecastByCityName(cityName: string): Observable<ForecastModel> {
    const url = `${WEATHER_API_CONSTANTS.apiUrl}?q=${cityName}&appid=${WEATHER_API_CONSTANTS.apiKey}&units=metric`;

    return this.http.get<ForecastApiModel>(url)
      .pipe(map(resp => {
        return {
          cityName,
          weather: resp.list.map(forecast => {
            return {
              weatherDescription: forecast.weather[0].description,
              humidity: forecast.main.humidity,
              maxTemp: forecast.main.temp_max,
              minTemp: forecast.main.temp_min,
              date: new Date(forecast.dt_txt)
            } as WeatherDetails
          })
          .filter((item, index, weatherList) => weatherList.findIndex(elem => elem.date.getDay() === item.date.getDay() && elem.date.getDay() === item.date.getDay()) === index)
        } as ForecastModel
      }
    ))
  }
}
