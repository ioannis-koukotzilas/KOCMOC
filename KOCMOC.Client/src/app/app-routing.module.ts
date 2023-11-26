import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { ProducerEditComponent } from './views/producer/producer-edit/producer-edit.component';
import { ProducerListComponent } from './views/producer/producer-list/producer-list.component';

const routes: Routes = [
  { path: 'producers', component: ProducerListComponent },
  { path: 'add-producer', component: AddProducerComponent },
  { path: 'producer/edit/:id', component: ProducerEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
