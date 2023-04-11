export class CreateOrderType {
    reference: string
    client_id: number
    amount: number
    amount_payable: number
    amount_outstanding: number
    order_date: string
    expected_payment_date: string
}
