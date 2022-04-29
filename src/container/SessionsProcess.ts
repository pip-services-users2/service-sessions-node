import { ProcessContainer } from 'pip-services3-container-nodex';

import { SessionsServiceFactory } from '../build/SessionsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class SessionsProcess extends ProcessContainer {

    public constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory());
    }
}
