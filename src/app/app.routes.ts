import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Home3Component } from './demo/home3/home3.component';
import { Home4Component } from './demo/home4/home4.component';
import { Home2Component } from './demo/home2/home2.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () =>
            import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
    },

    {
        path:'index-02',
        component:Home2Component,
        data:{title:'Cargon 02'}
    },
    {
        path:'index-03',
        component:Home3Component,
        data:{title:'Cargon 03'}
    },
    {
        path:'index-04',
        component:Home4Component,
        data:{title:'Cargon 04'}
    },
];
