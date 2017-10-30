import { AppRoutingModule } from './app-routing.module';
//import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Material stuff

// animation support for  angular material components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import line for all of the angular components
import {MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule} from '@angular/material';




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

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MapComponent,
    RegisterComponent,
    LoginComponent
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
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  providers: [
    AuthService,
    //UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
