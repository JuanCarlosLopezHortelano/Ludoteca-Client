import { GAME_DATA } from "../../game/model/mock-games";
import { CLIENT_DATA } from "../../client/model/mock-clients";
import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMO_DATA: PrestamoPage = {
    content: [
        { id: 1, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 2, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 3, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 4, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 5, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 6, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 7, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
        { id: 8, game: GAME_DATA[0], client: CLIENT_DATA[0], loanDate: "2024-02-24", returnDate: "2024-03-24" },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 8,
};