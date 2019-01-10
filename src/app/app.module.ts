import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { HttpModule } from '@angular/http'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxAnalyticsUirouterModule } from 'ngx-analytics/uiroutermodule';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule } from 'angular2-useful-swiper';
import { AdsenseModule } from 'ng2-adsense';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DmcaComponent } from './dmca/dmca.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { environment } from '../environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorComponent } from './error/error.component';
import { SubscribeComponent } from './sidebar/subscribe/subscribe.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import { BooksListingComponent } from './books/books-listing/books-listing.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { NgxAnalyticsGoogleTagManager } from 'ngx-analytics/gtm';
import { ShareButtonsModule} from '@ngx-share/buttons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const APP_ID = 'ebooksden';
const firebase: any = {
  apiKey: "AIzaSyDzQehjUxeSXdG5bB1858vJBemLqSj35-M",
  authDomain: "ssrapp-5b234.firebaseapp.com",
  databaseURL: "https://ssrapp-5b234.firebaseio.com",
  projectId: "ssrapp-5b234",
  storageBucket: "ssrapp-5b234.appspot.com",
  messagingSenderId: "932884367188"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    AboutComponent,
    ContactComponent,
    DmcaComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SidebarComponent,
    ErrorComponent,
    SubscribeComponent,
    BookDetailsComponent,
    BooksComponent,
    BooksListingComponent,
    CategoriesDetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID }),
    HttpClientModule,
    HttpClientJsonpModule,
    ShareButtonsModule,
    FontAwesomeModule,
    HttpModule,
    SwiperModule,
    AngularFireModule.initializeApp(firebase, APP_ID),
    AngularFireDatabaseModule,
   // AngularFireAuthModule,
    AppRoutingModule,
    NgxAnalyticsUirouterModule.forRoot([NgxAnalyticsGoogleAnalytics]),
    ReactiveFormsModule,
     AdsenseModule.forRoot({
       adClient: 'ca-pub-7975824069098469',
       adSlot: 7512348693,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
