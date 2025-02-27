import { Client } from "../../client/model/Client";
import { Game } from "../../game/model/Game";

export class Prestamo{
    id: number;
    client: Client;
    game: Game;
    loanDate: string;
    returnDate: string;
}