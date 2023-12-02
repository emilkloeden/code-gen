import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { CodeInputComponent } from './code-input/code-input.component';
import { CodeDisplaySectionComponent } from './code-display-section/code-display-section.component';
import { ErrorOverlayComponent } from './error-overlay/error-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeDisplayComponent,
    CodeInputComponent,
    CodeDisplaySectionComponent,
    ErrorOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
