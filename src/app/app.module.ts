import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { CodeInputComponent } from './code-input/code-input.component';
import { CodeDisplaySectionComponent } from './code-display-section/code-display-section.component';
import { ErrorOverlayComponent } from './error-overlay/error-overlay.component';
import { LanguageHeaderComponent } from './language-header/language-header.component';
import { TypescriptLogoComponent } from './typescript-logo/typescript-logo.component';
import { SpringLogoComponent } from './spring-logo/spring-logo.component';
import { SpringLanguageComponent } from './spring-language/spring-language.component';
import { TypescriptLanguageComponent } from './typescript-language/typescript-language.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeDisplayComponent,
    CodeInputComponent,
    CodeDisplaySectionComponent,
    ErrorOverlayComponent,
    LanguageHeaderComponent,
    TypescriptLogoComponent,
    SpringLogoComponent,
    SpringLanguageComponent,
    TypescriptLanguageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
