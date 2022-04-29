"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const SessionsServiceFactory_1 = require("../build/SessionsServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class SessionsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory_1.SessionsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory());
    }
}
exports.SessionsProcess = SessionsProcess;
//# sourceMappingURL=SessionsProcess.js.map