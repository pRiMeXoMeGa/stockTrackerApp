export interface Sentiment{
    data: [
        {
            symbol: string,
            year: number,
            month: number,
            change: number,
            mspr: number
        },
    ],
    symbol: string,
}