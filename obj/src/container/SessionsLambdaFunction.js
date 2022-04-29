"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.SessionsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const SessionsServiceFactory_1 = require("../build/SessionsServiceFactory");
class SessionsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsServiceFactory_1.SessionsServiceFactory());
    }
}
exports.SessionsLambdaFunction = SessionsLambdaFunction;
exports.handler = new SessionsLambdaFunction().getHandler();
//# sourceMappingURL=SessionsLambdaFunction.js.map