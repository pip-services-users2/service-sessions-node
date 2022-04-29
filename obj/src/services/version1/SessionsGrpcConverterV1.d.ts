import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { SessionV1 } from '../../data/version1/SessionV1';
export declare class SessionsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    static toJson(value: any): string;
    static fromJson(value: string): any;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromSession(session: SessionV1): any;
    static toSession(obj: any): SessionV1;
    static fromSessionPage(page: DataPage<SessionV1>): any;
    static toSessionPage(obj: any): DataPage<SessionV1>;
}
