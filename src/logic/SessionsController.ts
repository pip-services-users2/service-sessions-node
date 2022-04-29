import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { FixedRateTimer } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from '../persistence/ISessionsPersistence';
import { ISessionsController } from './ISessionsController';
import { SessionsCommandSet } from './SessionsCommandSet';

export class SessionsController implements IConfigurable, IReferenceable, ICommandable, ISessionsController, IOpenable {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'options.cleanup_interval', 900000,
        'options.expire_timeout', 24 * 3600000,

        'dependencies.persistence', 'service-sessions:persistence:*:*:1.0'
    );

    private _logger: CompositeLogger = new CompositeLogger();
    private _dependencyResolver: DependencyResolver = new DependencyResolver(SessionsController._defaultConfig);
    private _persistence: ISessionsPersistence;
    private _commandSet: SessionsCommandSet;

    private _expireTimeout: number = 24 * 3600000;
    private _cleanupInterval: number = 900000;
    private _cleanupTimer: FixedRateTimer;

    public configure(config: ConfigParams): void {
        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
        this._cleanupInterval = config.getAsLongWithDefault('options.cleanup_interval', this._cleanupInterval);

        this._logger.configure(config);
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ISessionsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet(this);
        return this._commandSet;
    }

    public isOpen(): boolean {
        return this._cleanupTimer != null;
    }

    public async open(correlationId: string): Promise<void> {
        if (this._cleanupTimer) {
            return;
        }

        this._cleanupTimer = new FixedRateTimer(() => {
            this._logger.info(correlationId, 'Closing expired user sessions');
            this.closeExpiredSessions(correlationId);
        }, this._cleanupInterval);
        this._cleanupTimer.start();
    }

    public async close(correlationId: string): Promise<void> {
        if (this._cleanupTimer) {
            this._cleanupTimer.stop();
            this._cleanupTimer = null;
        }
    }
    
    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }
    
    public async getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        return await this._persistence.getOneById(correlationId, sessionId);
    }

    public async openSession(correlationId: string, user_id: string, user_name: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {
        let session = new SessionV1(
            IdGenerator.nextLong(),
            user_id, user_name, address, client
        );

        session.user = user;
        session.data = data;

        return await this._persistence.create(
            correlationId, session
        );
    }
    
    public async storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {
        return await this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'request_time', new Date(),
                'data', data
            )
        );
    }

    public async updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {
        return await this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'request_time', new Date(),
                'user', user
            )
        );
    }
    
    public async closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {
        return await this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'active', false,
                'request_time', new Date(),
                'close_time', new Date(), 
                'data', null,
                'user', null
            )
        );
    }

    public async closeExpiredSessions(correlationId: string): Promise<void> {
        let now = new Date().getTime();
        let requestTime = new Date(now - this._expireTimeout);
        return await this._persistence.closeExpired(correlationId, requestTime);
    }
    
    public async deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        return await this._persistence.deleteById(correlationId, sessionId);
    }
}
