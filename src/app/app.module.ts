import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerFieldComponent } from './tracker-field/tracker-field.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { ArrowComponent } from './common/arrow/arrow.component';
import { MonthToTextPipe } from './pipe/month-to-text.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerFieldComponent,
    SentimentComponent,
    StockCardComponent,
    ArrowComponent,
    MonthToTextPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
