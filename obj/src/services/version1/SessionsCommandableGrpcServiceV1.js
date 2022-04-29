"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class SessionsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'controller', 'default', '*', '*'));
    }
}
exports.SessionsCommandableGrpcServiceV1 = SessionsCommandableGrpcServiceV1;
//# sourceMappingURL=SessionsCommandableGrpcServiceV1.js.map