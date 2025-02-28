import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginator,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,

  ],
  templateUrl: './prestamo-list.component.html',
  styleUrl: './prestamo-list.component.scss'
})
export class PrestamoListComponent implements OnInit{

    
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  clients: Client[];
  games: Game[];
  prestamos: Prestamo[];
  filterGame: Game;
  filterClient: Client;
  filterDate: Date = new Date();

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client','loanDate', 'returnDate', 'action'];
  

  constructor(
    private gameService: GameService,
    private clientService: ClientService,
    private prestamoService: PrestamoService,
    public  dialog: MatDialog
  ){}
 
  ngOnInit(): void {
    console.log(this.dataSource)
    this.loadPage()


    
    this.clientService
        .getClients()
        .subscribe((clients) => (this.clients = clients));
  
    this.gameService
        .getGames()
        .subscribe((games) => (this.games = games));
  }

  
  onCleanFilter(): void {
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch(): void{
    this.loadPage();
   
  }

  loadPage (event?: PageEvent){
    const pageable: Pageable= {
      pageNumber : this.pageNumber,
      pageSize : this.pageSize,
      sort: [
        {
          property:'id',
          direction: 'ASC'
        }
      ]
    };

    if(event != null){
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const clientId =
    this.filterClient != null ? this.filterClient.id : null;
    const gameId =
        this.filterGame != null ? this.filterGame.id : null;

    const filterDate = this.filterDate;


    this.prestamoService.getPrestamos(pageable,clientId, gameId, filterDate).subscribe((data)=>
    {
      console.log(this.dataSource.data, "aquiiii")
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    })

  

  }

  createPrestamo() {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
        data: {},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit();
    });
  }

 
  deletePrestamo(prestamo: Prestamo){
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data:{
         title: 'Eliminar Prestamo',
         description: 'Atencion si borra el prestamo se perderan sus datos <br> ¿Desea Eliminarlo?'
      }
    });

    dialogRef.afterClosed().subscribe((result)=>{
      this.prestamoService.deletePrestamo(prestamo.id).subscribe((result)=>
        {
        this.ngOnInit();
      }
    )})
  };
  

}








