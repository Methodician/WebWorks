import { DataImportService } from './services/data/data-import.service';
import { AppRoutingModule } from './app-routing.module';
//import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { MatButtonModule, MatInputModule, MatToolbarModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule, MatChipsModule, MatSidenavModule, MatTooltipModule, MatTabsModule } from '@angular/material';
//import { MatToolbarModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DataImportComponent } from './components/data-import/data-import.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent,
    DataImportComponent
  ],
  imports: [
    //MatToolbarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC1a8GbePUKUQqhFtXKMG3hQpRGhaa3Liw' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    DataImportService
    //UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
