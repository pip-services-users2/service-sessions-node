import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class SessionsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new Descriptor('service-sessions', 'controller', 'default', '*', '1.0'));
    }
}