import { Injectable } from '@angular/core';
import { WEATHER_API_CONSTANTS } from '../constants/weather-api-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  public getForecastByCityName(cityName: string) {
    const url = `${WEATHER_API_CONSTANTS.apiUrl}?q=${cityName}&appid=${WEATHER_API_CONSTANTS.apiKey}&units=metric`;

    return this.http.get(url).pipe();
  }
}
