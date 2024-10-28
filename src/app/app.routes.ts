import { Routes } from '@angular/router';
import { ArbitroComponent } from './modules/personas/component/arbitro/arbitro.component';
import { HomeComponent } from './modules/layout/component/home/home.component';
import { EntrenadorComponent } from './modules/personas/component/entrenador/entrenador.component';
import { DetallesEntrenadorComponent } from './modules/personas/component/detalles-entrenador/detalles-entrenador.component';
import { DetallesArbitroComponent } from './modules/personas/component/detalles-arbitro/detalles-arbitro.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"arbitro",
        component: ArbitroComponent
    },
    {
        path:"entrenador",
        component: EntrenadorComponent
    },
    {
        path:"detalles-entrenador/:id",
        component: DetallesEntrenadorComponent
    },
    {
        path:"detalles-arbitro/:id",
        component: DetallesArbitroComponent
    }
];
