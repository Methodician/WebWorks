import { DataImportComponent } from './components/data-import/data-import.component';
import { DataManipulationComponent } from './components/data-manipulation/data-manipulation.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'import',
        component: DataImportComponent
    },
    {
        path: 'data',
        component: DataManipulationComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: MapComponent
    },
    {
        path: '',
        component: MapComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }