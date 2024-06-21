import { TCOrderItemDetailProps } from 'apps/backoffice/@contracts/order/order-item-detail.contract';
import { IOrderItem } from 'interface-models/order/order-item.interface';

export class OrderItemResponse {
    public static readonly fromEntity = (
        orderItem: IOrderItem,
    ): TCOrderItemDetailProps['data'] => ({
        id: orderItem.id,
        qty: orderItem.qty,
        price: orderItem.price,
        subTotalPrice: orderItem.subTotalPrice,
        snapshots: orderItem.snapshots,
        order: orderItem.order,
        movieSchedule: orderItem.movieSchedule,
    });

    static fromEntities(data: IOrderItem[]): TCOrderItemDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
