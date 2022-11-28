import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrackerFieldComponent } from './tracker-field/tracker-field.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   component:TrackerFieldComponent},

  { path: 'sentiment/:id',  component:SentimentComponent},
  { path: '**', component:PageNotFoundComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
