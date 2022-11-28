import { StockApiService } from './../service/stock-api.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sentiment } from '../stock-data-interface/sentiment';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  symbol: string='';
  btnStyle: number = 80;
  sentiment!: Sentiment;
  errorMsg: string='';
  companyName: string='';
  sub!:Subscription;
  constructor(private router:Router, 
              private activedRoute: ActivatedRoute,
              private apiService: StockApiService) { }

  ngOnInit(): void {
    this.symbol= String(this.activedRoute.snapshot.paramMap.get('id'));
    this.sub = this.apiService.getSentiment(this.symbol).subscribe({
        next: senti => {
            this.sentiment = senti;
        },
        error: err => this.errorMsg = err,
      }
    )
    
    const stocks = JSON.parse(localStorage.getItem('stocks')||'');
    for(let stock of stocks){
      if(stock.symbol==this.symbol){
        this.companyName = stock.companyName;
      }
    }
  }  

  onBack():void{
    this.router.navigate(['/']);
  }

}
