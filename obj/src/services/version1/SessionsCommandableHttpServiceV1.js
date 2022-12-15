"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SessionsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'controller', 'default', '*', '1.0'));
    }
}
exports.SessionsCommandableHttpServiceV1 = SessionsCommandableHttpServiceV1;
//# sourceMappingURL=SessionsCommandableHttpServiceV1.js.map