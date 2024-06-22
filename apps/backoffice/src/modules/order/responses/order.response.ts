import { TCOrderDetailProps } from 'apps/backoffice/@contracts/order/order/order-detail.contract';
import { IOrder } from 'interface-models/order/order.interface';

export class OrderResponse {
    public static readonly fromEntity = (
        order: IOrder,
    ): TCOrderDetailProps['data'] => ({
        id: order.id,
        orderItems: order.orderItems,
        paymentMethod: order.paymentMethod,
        totalItemPrice: order.totalItemPrice,
        user: order.user,
    });

    static fromEntities(data: IOrder[]): TCOrderDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
