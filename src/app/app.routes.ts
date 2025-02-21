
import { Routes } from '@angular/router';

    export const routes: Routes = [
        { path: '', redirectTo: '/games', pathMatch:'full'},
        { path: 'categories', loadComponent: () => import('../app/category/category-list/category-list.component').then(m => m.CategoryListComponent)},
        { path: 'authors',    loadComponent: () => import('../app/author/author-list/author-list.component').then(m => m.AuthorListComponent)},
        { path: 'games',      loadComponent: () => import('../app/game/game-list/game-list.component').then(m => m.GameListComponent)},
        { path: 'clients',    loadComponent: () => import('../app/client/client-list/client-list.component').then(m => m.ClientListComponent)},
    
    ];
;
