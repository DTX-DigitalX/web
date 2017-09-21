import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FileUploadModule } from 'ng2-file-upload';
import { TextMaskModule } from 'angular2-text-mask';
import { PopoverModule } from 'ngx-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { Domains } from './shared/models/domains.model';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomainsService } from './shared/services/domains.service';
import { CustomData } from './shared/services/custom-data.service';

// Modules
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';

import { DashboardService } from './shared/services/dashboard.service';
import { SpeechRecognitionService } from './shared/services/speech-recognition.service';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginService } from './shared/services/login.service';
import { HttpClient } from './shared/config/HttpClient';
import { UserService } from './shared/services/user.service';
import { RegisterGuard } from './shared/guards/register.guard';
import { IdeaService } from './shared/services/idea.service';
import { TruncatePipe } from './shared/pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    DashboardComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SidebarModule,    
    NavbarModule,    
    CurrencyMaskModule,
    TextMaskModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    FileUploadModule,
    HttpModule,
    RouterModule,    
    PopoverModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
    RegisterGuard,
    LoginService,
    HttpClient,
    DomainsService,
    DashboardService,
    SpeechRecognitionService,
    CustomData,
    Domains,
    IdeaService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
