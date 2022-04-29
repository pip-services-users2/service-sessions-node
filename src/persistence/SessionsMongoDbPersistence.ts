import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';

export class SessionsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<SessionV1, string> 
    implements ISessionsPersistence {

    constructor() {
        super('sessions');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let userId = filter.getAsNullableString('user_id');
        if (userId != null)
            criteria.push({ user_id: userId });

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ request_time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ request_time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-request_time', { user: 0, data: 0 });
    }


    public async create(correlationId: string, item: SessionV1): Promise<SessionV1> {
        if (item == null) {
            return;
        }

        let now = new Date();
        item.open_time = now;
        item.request_time = now;

        return await super.create(correlationId, item);
    }

    public async update(correlationId: string, item: SessionV1): Promise<SessionV1> {
        if (item == null) {
            return;
        }

        let now = new Date();
        item.request_time = now;

        return await super.update(correlationId, item);
    }

    public async closeExpired(correlation_id: string, request_time: Date): Promise<void> {
        let criteria = {
            request_time: { $lt: request_time },
            active: true
        };
        let newItem = {
            $set: {
                active: false,
                request_time: new Date(),
                close_time: new Date(),
                user: null,
                data: null
            }
        };
        let options = {
            multi: true
        };

        await this._collection.update(criteria, newItem, options, (err, count) => {
            if (count > 0)
                this._logger.debug(correlation_id, 'Closed %d expired sessions', count);
        });
    }

}