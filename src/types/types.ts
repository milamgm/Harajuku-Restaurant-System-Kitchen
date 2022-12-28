export interface IItem{
    id: string,
    name: string,
    price: number,
    quantity: number
}

export interface IOrder {
    order_id: string,
    table_num: number,
    time: number,
    items: IItem[]
}