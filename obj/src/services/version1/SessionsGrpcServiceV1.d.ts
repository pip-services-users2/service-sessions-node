import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class SessionsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSessions;
    private getSessionById;
    private openSession;
    private storeSessionData;
    private updateSessionUser;
    private closeSession;
    private closeExpiredSessions;
    private deleteSessionById;
    register(): void;
}
