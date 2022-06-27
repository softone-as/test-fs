import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { In, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class InAppNotificationService {
    constructor(
        @InjectRepository(InAppNotification)
        private readonly notificationRepository: Repository<InAppNotification>,
    ) {}

    async create(data: IInAppNotification): Promise<IInAppNotification> {
        const newAdmin = this.notificationRepository.create(data);
        return await this.notificationRepository.save(newAdmin);
    }

    async bulkCreateByUserIds(
        userIds: number[],
        data: IInAppNotification,
    ): Promise<void> {
        const newDatas = userIds.map((userId) => {
            const newData = <IInAppNotification>{};
            Object.assign(newData, data);
            newData.targetUserId = userId;
            return newData;
        });

        await this.notificationRepository
            .createQueryBuilder()
            .insert()
            .into(InAppNotification)
            .values(newDatas)
            .execute();
    }

    async update(
        id: number,
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { id },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    async updateByUser(
        userId: number,
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { targetUser: { id: userId } },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    async updateByUserAndIds(
        userId: number,
        ids: number[],
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { id: In(ids), targetUser: { id: userId } },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    async delete(id: number): Promise<void> {
        const status = await this.notificationRepository.delete({ id });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }
    }

    async findOneById(id: number): Promise<IInAppNotification> {
        return await this.notificationRepository.findOneOrFail({
            where: { id },
        });
    }

    async findOneByUserAndId(
        userId: number,
        id: number,
    ): Promise<IInAppNotification> {
        return await this.notificationRepository.findOneOrFail({
            where: { id, targetUser: { id: userId } },
        });
    }

    async findOneByIds(ids: number[]): Promise<IInAppNotification[]> {
        return await this.notificationRepository.find({
            where: { id: In(ids) },
        });
    }
}
