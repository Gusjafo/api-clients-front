import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data-handle/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  title: string = 'New Client';
  forms!: NodeListOf<Element>;

  constructor(private data: DataService) {}

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
    Array.prototype.slice.call(this.forms).forEach(function (form) {
      if (form.checkValidity()) {
        flag = true;
      }
    });
    if (flag) {
      this.data.createClient(clientData.value);
    }
  }
}
