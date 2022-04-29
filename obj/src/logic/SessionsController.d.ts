import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsController } from './ISessionsController';
export declare class SessionsController implements IConfigurable, IReferenceable, ICommandable, ISessionsController, IOpenable {
    private static _defaultConfig;
    private _logger;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    private _expireTimeout;
    private _cleanupInterval;
    private _cleanupTimer;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    isOpen(): boolean;
    open(correlationId: string): Promise<void>;
    close(correlationId: string): Promise<void>;
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>>;
    getSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
    openSession(correlationId: string, user_id: string, user_name: string, address: string, client: string, user: any, data: any): Promise<SessionV1>;
    storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1>;
    updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1>;
    closeSession(correlationId: string, sessionId: string): Promise<SessionV1>;
    closeExpiredSessions(correlationId: string): Promise<void>;
    deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
}
