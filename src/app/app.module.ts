import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MapComponent
  ],
  imports: [
    //MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC1a8GbePUKUQqhFtXKMG3hQpRGhaa3Liw' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
