import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducerEditComponent } from './views/producer/producer-edit/producer-edit.component';
import { ProducerListComponent } from './views/producer/producer-list/producer-list.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProducerListComponent,
    ProducerEditComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
