import { Routes } from '@angular/router';
import { ArbitroComponent } from './modules/personas/component/arbitro/arbitro.component';
import { HomeComponent } from './modules/layout/component/home/home.component';
import { EntrenadorComponent } from './modules/personas/component/entrenador/entrenador.component';

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
    }
];
