let messages = require('../../../../src/protos/sessions_v1_pb');

import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { SessionV1 } from '../../data/version1/SessionV1';

export class SessionsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        SessionsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: SessionsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject === 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        SessionsGrpcConverterV1.setMap(values, map);
        return values;
    }

    public static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    public static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromSession(session: SessionV1): any {
        if (session == null) return null;

        let obj = new messages.Session();

        obj.setId(session.id);
        obj.setUserId(session.user_id);
        obj.setUserName(session.user_name);

        obj.setActive(session.active);
        obj.setOpenTime(StringConverter.toString(session.open_time))
        obj.setCloseTime(StringConverter.toString(session.close_time))
        obj.setRequestTime(StringConverter.toString(session.request_time))
        obj.setAddress(session.address);
        obj.setClient(session.client);

        obj.setUser(SessionsGrpcConverterV1.toJson(session.user));
        obj.setData(SessionsGrpcConverterV1.toJson(session.data));

        return obj;
    }

    public static toSession(obj: any): SessionV1 {
        if (obj == null) return null;

        let session: SessionV1 = {
            id: obj.getId(),
            user_id: obj.getUserId(),
            user_name: obj.getUserName(),
            active: obj.getActive(),
            open_time: DateTimeConverter.toDateTime(obj.getOpenTime()),
            close_time: DateTimeConverter.toDateTime(obj.getCloseTime()),
            request_time: DateTimeConverter.toDateTime(obj.getRequestTime()),
            address: obj.getAddress(),
            client: obj.getClient(),
            user: SessionsGrpcConverterV1.fromJson(obj.getUser()),
            data: SessionsGrpcConverterV1.fromJson(obj.getData())
        };

        return session;
    }

    public static fromSessionPage(page: DataPage<SessionV1>): any {
        if (page == null) return null;

        let obj = new messages.SessionPage();

        obj.setTotal(page.total);
        let data = page.data.map(SessionsGrpcConverterV1.fromSession);
        obj.setDataList(data);

        return obj;
    }

    public static toSessionPage(obj: any): DataPage<SessionV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(SessionsGrpcConverterV1.toSession);
        let page: DataPage<SessionV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}