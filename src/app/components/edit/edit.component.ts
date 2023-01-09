import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { DataService } from 'src/app/services/data-handle/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  title: string = 'Edit Client';
  client: Client;
  forms!: NodeListOf<Element>;

  constructor(private data: DataService) {
    this.client = this.data.getClient();
  }

  ngOnInit(): void {
    this.forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(this.forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event: {
          preventDefault: () => void;
          stopPropagation: () => void;
        }) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  onSubmit(clientData: NgForm) {
    let flag: boolean = false;
    let clientToEdit: Client;

    Array.prototype.slice.call(this.forms).forEach(function (form) {
      if (form.checkValidity()) {
        flag = true;
      }
    });
    if (flag) {
      clientToEdit = clientData.value;
      clientToEdit.id = this.client.id;
      this.data.editClient(clientToEdit);
    }
  }
}
