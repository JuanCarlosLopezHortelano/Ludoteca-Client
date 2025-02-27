import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameService } from '../../game/game.service';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { ClientService } from '../../client/client.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-prestamo-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './prestamo-edit.component.html',
  styleUrl: './prestamo-edit.component.scss'
})
export class PrestamoEditComponent implements OnInit {
  prestamo: Prestamo;
  clients: Client[];
  games: Game[];
  
  constructor(
    public dialogRef: MatDialogRef<PrestamoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService,
  ){}

  ngOnInit(): void {
    this.prestamo = new Prestamo();
    
     
    this.clientService
        .getClients()
        .subscribe((clients) => (this.clients = clients));
  
    this.gameService
        .getGames()
        .subscribe((games) => (this.games = games));
  }

  onSave(){
    this.prestamoService.savePrestamo(this.prestamo).subscribe(()=>{
    this.dialogRef.close();
    })  }

  onClose(){
    this.dialogRef.close()  }

}
