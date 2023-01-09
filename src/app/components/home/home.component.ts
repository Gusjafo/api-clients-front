import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { DataService } from 'src/app/services/data-handle/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = 'Client List';
  clients: Observable<Client[]> = new Observable<Client[]>();

  constructor(private data: DataService, private route: Router) {}

  ngOnInit(): void {
    this.clients = this.data.getClientListObservable();
    this.data.getClients();
  }

  onDelete(client: Client) {
    this.data.deleteClient(client.id);
  }

  onEdit(client: Client) {
    this.data.setClient(client);
    this.route.navigate(['/app-edit'])
  }
}
