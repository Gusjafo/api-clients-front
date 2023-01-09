import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ResourcesService } from '../resources/resources.service';
import { Router } from '@angular/router';
import { Weather } from 'src/app/models/weather';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clientList: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(
    []
  );

  public weatherData: BehaviorSubject<Weather> = new BehaviorSubject<Weather>({
    location: { name: 'Buenos aires', country: 'Argentina' },
    current: {
      temp_c: 22,
      condition: { icon: '//cdn.weatherapi.com/weather/64x64/night/113.png' },
    },
  });

  private clientToEdit: any;

  constructor(private resources: ResourcesService, private route: Router) {
    navigator.geolocation.getCurrentPosition((position) => {
      let location =
        position.coords.latitude.toString() +
        ',' +
        position.coords.longitude.toString();

      this.getWeatherData(location);
    });
  }

  getClientListObservable(): Observable<Client[]> {
    return this.clientList.asObservable();
  }

  setClientListObservable(data: Client[]) {
    this.clientList.next(data);
  }

  getClient(): Client {
    return this.clientToEdit;
  }

  setClient(client: Client) {
    this.clientToEdit = client;
  }

  getClients() {
    this.resources.getClientsData().subscribe((data) => {
      this.setClientListObservable(data);
    });
  }

  searchClients(key: string) {
    if (key == null || key.length == 0) {
      this.getClients();
    } else {
      this.resources.searchClientsData(key).subscribe((data) => {
        this.setClientListObservable(data);
      });
    }
  }

  deleteClient(id: number) {
    this.resources.deleteClient(id).subscribe(() => {
      this.getClients();
    });
  }

  createClient(client: Client) {
    this.resources.createClient(client).subscribe(() => {
      this.getClients();
      this.route.navigate(['']);
    });
  }

  editClient(client: Client) {
    this.resources.editClient(client).subscribe(() => {
      this.getClients();
      this.route.navigate(['']);
    });
  }

  getWeatherData(location: string) {
    this.resources.getWeatherData(location).subscribe((data) => {
      this.weatherData.next(data)
    });
  }
}
