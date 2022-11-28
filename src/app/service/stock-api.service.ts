import { ComapnyDetail } from '../stock-data-interface/company-detail';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError} from "rxjs";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Quote } from '../stock-data-interface/quote';
import { formatDate } from '@angular/common';
import { Sentiment } from '../stock-data-interface/sentiment';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  apiURL:string = environment.apiURL;
  apiToken:string = environment.apiToken;
  from:string = formatDate(new Date().setMonth(new Date().getMonth()-3), 'yyyy-MM-dd', 'en');
  to:string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  constructor(private httpClient: HttpClient) { }

  getQuote(symbol:string): Observable<Quote>{
    return this.httpClient.get<Quote>(this.apiURL+ 
      'quote?symbol=' + symbol + '&token='+ this.apiToken).pipe(
      catchError(this.handleError)
    );
  }

  getComapnyName(symbol:string): Observable<ComapnyDetail>{
    return this.httpClient.get<ComapnyDetail>(this.apiURL+ 
      'search?q=' + symbol + '&token='+ this.apiToken).pipe(
      catchError(this.handleError)
    );
  }
  
  getSentiment(symbol:string): Observable<Sentiment>{
    return this.httpClient.get<Sentiment>(this.apiURL +
      'stock/insider-sentiment?symbol=' + symbol +'&from=' + this.from + 
      '&to=' + this.to + '&token='+ this.apiToken).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(err:HttpErrorResponse){
    let errMsg ='';
    if(err.error instanceof ErrorEvent){
      errMsg = `An error occured: ${err.error.message}`;
    }
    else{
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errMsg);
    return throwError(()=>errMsg);
  }
}
