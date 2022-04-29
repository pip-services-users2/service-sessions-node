let services = require('../../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../../src/protos/sessions_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { ISessionsController } from '../../logic/ISessionsController';
import { SessionsGrpcConverterV1 } from './SessionsGrpcConverterV1';

export class SessionsGrpcServiceV1 extends GrpcService {
    private _controller: ISessionsController;
	
    public constructor() {
        super(services.SessionsService);
        this._dependencyResolver.put('controller', new Descriptor("service-sessions", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<ISessionsController>('controller');
    }
    
    private async getSessions(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();

        SessionsGrpcConverterV1.setMap(filter, call.request.getFilterMap());

        let paging = SessionsGrpcConverterV1.toPagingParams(call.request.getPaging());
        let response = new messages.SessionPageReply();

        try {
            let session = await this._controller.getSessions(correlationId, filter, paging);
            let page = SessionsGrpcConverterV1.fromSessionPage(session);
            response.setPage(page);

        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
        
    }

    private async getSessionById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let response = new messages.SessionObjectReply();

        try {
            let session = await this._controller.getSessionById(correlationId, sessionId);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async openSession(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let userName = call.request.getUserName();
        let address = call.request.getAddress();
        let client = call.request.getClient();
        let user = SessionsGrpcConverterV1.fromJson(call.request.getUser());
        let data = SessionsGrpcConverterV1.fromJson(call.request.getData());
        
        let response = new messages.SessionObjectReply();
        try {
            let session = await this._controller.openSession(correlationId, userId, userName, address, client, user, data);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            if (session)
                response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async storeSessionData(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let data = SessionsGrpcConverterV1.fromJson(call.request.getData());

        let response = new messages.SessionObjectReply();

        try {
            let session = await this._controller.storeSessionData(correlationId, sessionId, data);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            if (session)
                response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async updateSessionUser(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let user = SessionsGrpcConverterV1.fromJson(call.request.getUser());

        let response = new messages.SessionObjectReply();
        try {
            let session = await this._controller.updateSessionUser(correlationId, sessionId, user);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            if (session)
                response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }
    
    private async closeSession(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();

        let response = new messages.SessionObjectReply();
        try {
            let session = await this._controller.closeSession(correlationId, sessionId);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            if (session)
                response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    

    private async closeExpiredSessions(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let response = new messages.SessionEmptyReply();

        try {
            await this._controller.closeExpiredSessions(correlationId);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    

    private async deleteSessionById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();

        let response = new messages.SessionObjectReply();
        try {
            let session = await this._controller.deleteSessionById(correlationId, sessionId);
            let grpcSessionObj = SessionsGrpcConverterV1.fromSession(session);
            if (session)
                response.setSession(grpcSessionObj);
        } catch (err) {
            let error = SessionsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    public register() {
        this.registerMethod(
            'get_sessions', 
            null,
            this.getSessions
        );

        this.registerMethod(
            'get_session_by_id', 
            null,
            this.getSessionById
        );

        this.registerMethod(
            'open_session', 
            null,
            this.openSession
        );

        this.registerMethod(
            'store_session_data', 
            null,
            this.storeSessionData
        );

        this.registerMethod(
            'update_session_user', 
            null,
            this.updateSessionUser
        );

        this.registerMethod(
            'close_session', 
            null,
            this.closeSession
        );

        this.registerMethod(
            'close_expired_sessions', 
            null,
            this.closeExpiredSessions
        );

        this.registerMethod(
            'delete_session_by_id',
            null, 
            this.deleteSessionById
        );
    }
}
