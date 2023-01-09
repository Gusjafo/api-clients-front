import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-handle/data.service';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-api-weather',
  templateUrl: './api-weather.component.html',
  styleUrls: ['./api-weather.component.css'],
})
export class ApiWeatherComponent implements OnInit {
  dataFromApi: Observable<Weather> = this.data.weatherData;
  weatherData: Weather = {
    location: { name: 'Buenos aires', country: 'Argentina' },
    current: {
      temp_c: 22,
      condition: { icon: '//cdn.weatherapi.com/weather/64x64/night/113.png' },
    },
  };
  location: string = '';

  constructor(private data: DataService) {
    this.dataFromApi.subscribe((data) => {
      this.weatherData = data;
    });
  }

  ngOnInit(): void {}
}
