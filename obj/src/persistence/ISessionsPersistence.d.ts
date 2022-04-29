import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { SessionV1 } from '../data/version1/SessionV1';
export interface ISessionsPersistence extends IGetter<SessionV1, string>, IWriter<SessionV1, string> {
    getPageByFilter(correlation_id: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>>;
    getOneById(correlation_id: string, id: string): Promise<SessionV1>;
    create(correlation_id: string, item: SessionV1): Promise<SessionV1>;
    update(correlation_id: string, item: SessionV1): Promise<SessionV1>;
    updatePartially(correlation_id: string, id: string, data: AnyValueMap): Promise<SessionV1>;
    deleteById(correlation_id: string, id: string): Promise<SessionV1>;
    closeExpired(correlation_id: string, request_time: Date): Promise<void>;
}
