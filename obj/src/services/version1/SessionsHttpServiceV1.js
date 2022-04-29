"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SessionsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'controller', 'default', '*', '1.0'));
    }
}
exports.SessionsHttpServiceV1 = SessionsHttpServiceV1;
//# sourceMappingURL=SessionsHttpServiceV1.js.map