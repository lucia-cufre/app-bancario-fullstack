export interface TransactionDTO {
    username: string,
    value: number
}

export enum Filter {
    DEBIT = "debit",
    CREDIT = "credit"
}