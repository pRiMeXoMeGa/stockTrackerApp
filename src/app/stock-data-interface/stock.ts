import { Quote } from "./quote";

export interface Stock{
    priceDetail: Quote;
    companyName: string;
    symbol: string;
}