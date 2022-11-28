import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() c:number=0;
  @Input() d:number=0;
  @Input() h:number=0;
  @Input() o:number=0;
  @Input() companyName:string='';
  @Input() symbol:string='';
  @Output() closeBtn : EventEmitter<string> =new EventEmitter<string>();
  

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  onClick():void{
    this.closeBtn.emit(this.symbol);
  }

}
