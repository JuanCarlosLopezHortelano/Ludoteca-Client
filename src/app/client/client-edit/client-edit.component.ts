import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  client: Client;
  
  constructor(
      public dialogRef: MatDialogRef<ClientEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {client: Client},
      private clientService: ClientService
    ){}

  ngOnInit(): void {
    this.client = this.data.client != null ? Object.assign({}, this.data.client) : new Client();
  }

  onSave(){
    this.clientService.saveClient(this.client).subscribe(() =>{
      this.dialogRef.close();
    });
  }

  onClose(){
    this.dialogRef.close();
  }
}
