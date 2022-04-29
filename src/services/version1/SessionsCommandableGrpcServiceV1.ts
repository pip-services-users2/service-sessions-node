import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class SessionsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new Descriptor('service-sessions', 'controller', 'default', '*', '*'));
    }
}