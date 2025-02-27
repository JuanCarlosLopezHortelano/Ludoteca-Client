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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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

    if (!this.prestamo.loanDate){this.snackBar.open('Debe rellenar la fecha de reserva','Cerrar',{duration: 3000}); return }
    if (!this.prestamo.returnDate){this.snackBar.open('Debe rellenar la fecha de devolucion','Cerrar',{duration: 3000}); return }
    if (this.prestamo.loanDate > this.prestamo.returnDate){this.snackBar.open('La fecha de inicio no puede ser mayor a la fecha de devolucion','Cerrar',{duration: 3000}); return }
  
    const daysDiff = (new Date(this.prestamo.returnDate).getTime()-new Date(this.prestamo.loanDate).getTime())/(1000*60*60*24);
    if(daysDiff > 14){
      this.snackBar.open('Error: Lo sentimos el prestamo no puede durar mas de 14 días','Cerrar',{duration: 3000});return;
    }

    this.prestamoService.savePrestamo(this.prestamo).subscribe(()=>{
    this.dialogRef.close();
    }) 
  }

  onClose(){
    this.dialogRef.close()  
  }

}
