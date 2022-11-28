import { TrackerFieldComponent } from './tracker-field/tracker-field.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   component:TrackerFieldComponent},

  { path: 'sentiment/:id',  component:SentimentComponent},
  //{ path: '**', component:TrackerComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
