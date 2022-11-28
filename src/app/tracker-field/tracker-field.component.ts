import { ComapnyDetail } from '../stock-data-interface/company-detail';
import { StockApiService } from './../service/stock-api.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from '../stock-data-interface/quote';
import { Stock } from '../stock-data-interface/stock';

@Component({
  selector: 'app-tracker-field',
  templateUrl: './tracker-field.component.html',
  styleUrls: ['./tracker-field.component.css']
})
export class TrackerFieldComponent implements OnInit {

  description: string = 'Enter the Symbol of the Stock to track:';
  example: string = '(i.e. AAPL, TSLA, MSFT)';

  private _stockSymbol: string='';
  stocksList: Stock[] = [];
  stockSymbols: string[] = [];
  sub1!: Subscription;
  sub2!: Subscription;
  errorMsg: string= '';
  quote!: Quote;
  companyDetail!:ComapnyDetail;

  get stockSymbol(): string{
    return this._stockSymbol;
  }
  set stockSymbol(value: string){
    this._stockSymbol = value.toUpperCase();
  }

  constructor(private apiService: StockApiService) { }

  ngOnInit(): void {
    if(localStorage.length){
      this.stockSymbols = JSON.parse(localStorage.getItem('symbol-list')||'');
      for(let s of this.stockSymbols){
        this.sub1 = this.getStockQuote(s);
      }
      // this.stocksList = JSON.parse(localStorage.getItem('stocks')||'');
    }
  }

  addToLocalStorage():void{
    localStorage.setItem('symbol-list', JSON.stringify(this.stockSymbols));
    localStorage.setItem('stocks',JSON.stringify(this.stocksList));
  }
  
  addToList():void{
    this.stocksList.push({priceDetail:this.quote,
                          companyName:this.companyDetail.result[0].description,
                          symbol:this.stockSymbol});
    this.stockSymbols.push(this.stockSymbol);
  }

  getCompanyDetails():Subscription{
    return  this.apiService.getComapnyName(this.stockSymbol).subscribe({
                next: companyDetail => {
                  this.companyDetail = companyDetail;
                  this.addToList();
                  this.addToLocalStorage();
                },
                error: err => this.errorMsg = err,
              }
            )
  }

  updateStock(symbol:string):void{
    const stocks = JSON.parse(localStorage.getItem('stocks')||'');
    for(let stock of stocks){
      if(stock.symbol==symbol){
        stock.priceDetail = this.quote;
        localStorage.setItem('stocks',JSON.stringify(stocks));
      }
    }
    this.stocksList = JSON.parse(localStorage.getItem('stocks')||'');
  }

  getStockQuote(symbol:string): Subscription{
    return this.apiService.getQuote(symbol).subscribe({
        next: quo => {
            this.quote = quo;
            if(this.quote.c!=0 && this.quote.d!=0){
                if(!this.stockSymbols.includes(symbol)){
                  this.sub2 = this.getCompanyDetails();
                }
                else{
                  this.updateStock(symbol);
                }
            }
            else{
                alert("please enter valid stock symbol");
            }
        },
        error: err => this.errorMsg = err,
      }
    )
  }

  submitSymbol():void{
    this.sub1 = this.getStockQuote(this.stockSymbol);
  }

  onCloseTab(symbol:string):void{
    this.stocksList.splice(this.stockSymbols.indexOf(symbol),1);
    this.stockSymbols.splice(this.stockSymbols.indexOf(symbol),1);
    this.addToLocalStorage();
  }

}
