import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule } from '../../node_modules/@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DynaFormComponent } from './shared/components/dyna-form/dyna-form.component';

@NgModule({
  declarations: [AppComponent, DynaFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    MaterialDesignFrameworkModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
