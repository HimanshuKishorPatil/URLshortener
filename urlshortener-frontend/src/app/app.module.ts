import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NewURLComponent } from './components/new-url/new-url.component';
import { register } from 'module';
import { UserURLsComponent } from './components/user-urls/user-urls.component';
import { NevbarComponent } from './components/nevbar/nevbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MSAL_INSTANCE, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MaxLengthDirective } from './user/max-length.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { OAuthModule } from 'angular-oauth2-oidc';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import {
  GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './compenents/testing/testing.component';
import { WeatherComponent } from './weather/weather.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './footer/footer.component';



export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'bb156bf9-8d21-477d-9633-53c4c89eea2f',
      authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
      redirectUri: 'http://localhost:4200'
    }
  })
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewURLComponent,
    UserURLsComponent,
    NevbarComponent,
    PageNotFoundComponent,
    MaxLengthDirective,
    TestingComponent,
    WeatherComponent,
    FooterComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    MsalModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
    GoogleSigninButtonModule,

    ToastrModule.forRoot(),
    OAuthModule.forRoot(),
    // microsoftAzure
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth: {
            clientId: 'bb156bf9-8d21-477d-9633-53c4c89eea2f',
            authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
            redirectUri: 'http://localhost:4200'
          },
          // cache: {
          //   cacheLocation: 'localStorage',
          //   storeAuthStateInCookie:isIE
          // }
        }
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['User.Read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph/microsoft.com/v1.0/me', ['User.Read']]
          ]
        )
      }
    )



  ],
  providers: [ HttpClient,NevbarComponent, LoginComponent,FooterComponent,UserURLsComponent,NewURLComponent,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '660065499154-kfh3ejjcrmd2g1l5audket9is4738dv9.apps.googleusercontent.com'
            )
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig
    },


    provideClientHydration(),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },

    // MsalService,
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(),


    // microsoft azure
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    provideAnimationsAsync()],

  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
