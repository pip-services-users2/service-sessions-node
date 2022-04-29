"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsGrpcServiceV1 = void 0;
let services = require('../../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../../src/protos/sessions_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const SessionsGrpcConverterV1_1 = require("./SessionsGrpcConverterV1");
class SessionsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.SessionsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-sessions", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getSessions(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.SessionPageReply();
            try {
                let session = yield this._controller.getSessions(correlationId, filter, paging);
                let page = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSessionPage(session);
                response.setPage(page);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getSessionById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let sessionId = call.request.getSessionId();
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.getSessionById(correlationId, sessionId);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    openSession(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let userName = call.request.getUserName();
            let address = call.request.getAddress();
            let client = call.request.getClient();
            let user = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getUser());
            let data = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getData());
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.openSession(correlationId, userId, userName, address, client, user, data);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                if (session)
                    response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    storeSessionData(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let sessionId = call.request.getSessionId();
            let data = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getData());
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.storeSessionData(correlationId, sessionId, data);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                if (session)
                    response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    updateSessionUser(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let sessionId = call.request.getSessionId();
            let user = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getUser());
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.updateSessionUser(correlationId, sessionId, user);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                if (session)
                    response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    closeSession(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let sessionId = call.request.getSessionId();
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.closeSession(correlationId, sessionId);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                if (session)
                    response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    closeExpiredSessions(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let response = new messages.SessionEmptyReply();
            try {
                yield this._controller.closeExpiredSessions(correlationId);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteSessionById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let sessionId = call.request.getSessionId();
            let response = new messages.SessionObjectReply();
            try {
                let session = yield this._controller.deleteSessionById(correlationId, sessionId);
                let grpcSessionObj = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(session);
                if (session)
                    response.setSession(grpcSessionObj);
            }
            catch (err) {
                let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_sessions', null, this.getSessions);
        this.registerMethod('get_session_by_id', null, this.getSessionById);
        this.registerMethod('open_session', null, this.openSession);
        this.registerMethod('store_session_data', null, this.storeSessionData);
        this.registerMethod('update_session_user', null, this.updateSessionUser);
        this.registerMethod('close_session', null, this.closeSession);
        this.registerMethod('close_expired_sessions', null, this.closeExpiredSessions);
        this.registerMethod('delete_session_by_id', null, this.deleteSessionById);
    }
}
exports.SessionsGrpcServiceV1 = SessionsGrpcServiceV1;
//# sourceMappingURL=SessionsGrpcServiceV1.js.map