import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-handle/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(private data: DataService) {}

  ngOnInit(): void {}

  onSearch(key: string) {
    this.data.searchClients(key);
  }
}
