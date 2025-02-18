
import { Routes } from '@angular/router';

    export const routes: Routes = [
        { path: 'categories', loadComponent: () => import('../app/category/category-list/category-list.component').then(m => m.CategoryListComponent)},
        { path: 'authors', loadComponent: () => import('../app/author/author-list/author-list.component').then(m => m.AuthorListComponent)}
    ];
;
