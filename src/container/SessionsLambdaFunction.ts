import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { SessionsServiceFactory } from '../build/SessionsServiceFactory';

export class SessionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new Descriptor('service-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsServiceFactory());
    }
}

export const handler = new SessionsLambdaFunction().getHandler();