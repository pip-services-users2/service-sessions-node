import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';

export class SessionsMemoryPersistence 
    extends IdentifiableMemoryPersistence<SessionV1, string> 
    implements ISessionsPersistence {

    constructor() {
        super();
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let id = filter.getAsNullableString('id');
        let userId = filter.getAsNullableString('user_id');
        let active = filter.getAsNullableBoolean('active');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');

        return (item: SessionV1) => {
            if (id != null && id != item.id)
                return false;
            if (userId != null && userId != item.user_id)
                return false;
            if (active != null && active != item.active)
                return false;
            if (fromTime != null && item.request_time >= fromTime)
                return false;
            if (toTime != null && item.request_time < toTime)
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        let page =  await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);

        page.data = page.data.map(item => {
            let filtered = Object.entries(item).filter(([key]) => !['user', 'data'].includes(key));
            return Object.fromEntries(filtered) as SessionV1;
        });

        return page;
    }

    public async create(correlationId: string, item: SessionV1): Promise<SessionV1> {
        if (item == null) return;

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
        let time = request_time.getTime();
        let now = new Date();
        let count = 0;

        for (let item of this._items) {
            if (item.active && item.request_time.getTime() < time) {
                item.active = false;
                item.close_time = now;
                item.request_time = now;
                item.data = null;
                item.user = null;

                count++;
            }
        }

        if (count > 0) {
            this._logger.debug(correlation_id, 'Closed %d expired sessions', count);

            await this.save(correlation_id);
        }
    }

}
