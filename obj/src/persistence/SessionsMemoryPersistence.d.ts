import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';
export declare class SessionsMemoryPersistence extends IdentifiableMemoryPersistence<SessionV1, string> implements ISessionsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>>;
    create(correlationId: string, item: SessionV1): Promise<SessionV1>;
    update(correlationId: string, item: SessionV1): Promise<SessionV1>;
    closeExpired(correlation_id: string, request_time: Date): Promise<void>;
}
