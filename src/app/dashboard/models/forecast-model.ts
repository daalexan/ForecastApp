export interface ForecastModel {
  cityName: string;
  weather: WeatherDetails[];
}

export interface WeatherDetails {
  weatherDescription: string;
  humidity: number;
  maxTemp: number;
  minTemp: number;
  date: Date;
}

export interface ForecastApiModel {
  list: Array<ForecastDetailsApiModel>;
}

interface ForecastDetailsApiModel {
  weather: Array<{ description: string }>;
  main: {
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  }
  dt_txt: string;
}
