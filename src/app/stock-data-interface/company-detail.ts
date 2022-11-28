export interface ComapnyDetail{
    count: number,
    result: [
        {
            description: string,
            displaySymbol: string,
            symbol: string,
            type: string
        },
    ]
}