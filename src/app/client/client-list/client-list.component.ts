import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/Client';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-client-list',
  imports: [MatButtonModule,MatTableModule, MatIconModule, CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action']

  constructor ( 
    private clientService: ClientService,
    private dialog: MatDialog
  ){
  
  }

  ngOnInit(): void{
    this.clientService.getClients().subscribe(clients => this.dataSource.data = clients)
  }

  createClient(){
    const dialogRef = this.dialog.open(ClientEditComponent,{
      data: {}
    }

    );
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  editClient(client: Client){
    const dialogRef = this.dialog.open(ClientEditComponent,{
      data: {client}
    }

    );
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  deleteClient(client: Client){
    const dialogRef = this.dialog.open(DialogConfirmationComponent,{
      data:{title: "Eliminar cliente", description: "Cuidado, si borra el cliente se perderan sus datos <br> Estas seguro??"}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result) {
        this.clientService.deleteClient(client.id).subscribe(result =>{
          this.ngOnInit();
        })
      }
    })
  }


}
