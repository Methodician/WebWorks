import { DataImportService } from './services/data/data-import.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { DataManipulationService } from './services/data-manipulation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Material stuff

// animation support for AngularMaterial components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import line for all of the AngularMaterial components
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';




import { AppComponent } from './app.component';
//import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from "./services/user/user.service";
import { DataImportComponent } from './components/data-import/data-import.component';
import { DataManipulationComponent } from './components/data-manipulation/data-manipulation.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { MapService } from "./services/map/map.service";

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent,
    DataImportComponent,
    DataManipulationComponent,
    LeafletMapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    //AgmCoreModule.forRoot({ apiKey: 'AIzaSyC1a8GbePUKUQqhFtXKMG3hQpRGhaa3Liw' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    //  AngularMaterial imports:
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  providers: [
    AuthService,
    UserService,
    MapService,
    DataImportService,
    DataManipulationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
