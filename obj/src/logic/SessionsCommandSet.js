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
exports.SessionsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
class SessionsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSessionsCommand());
        this.addCommand(this.makeGetSessionByIdCommand());
        this.addCommand(this.makeOpenSessionCommand());
        this.addCommand(this.makeStoreSessionDataCommand());
        this.addCommand(this.makeUpdateSessionUserCommand());
        this.addCommand(this.makeCloseSessionCommand());
        this.addCommand(this.makeCloseExpiredSessionsCommand());
        this.addCommand(this.makeDeleteSessionByIdCommand());
    }
    makeGetSessionsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_sessions", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getSessions(correlationId, filter, paging);
        }));
    }
    makeGetSessionByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_session_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let sessionId = args.getAsNullableString("session_id");
            return yield this._logic.getSessionById(correlationId, sessionId);
        }));
    }
    makeOpenSessionCommand() {
        return new pip_services3_commons_nodex_2.Command("open_session", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withOptionalProperty('user_name', pip_services3_commons_nodex_6.TypeCode.String)
            .withOptionalProperty('address', pip_services3_commons_nodex_6.TypeCode.String)
            .withOptionalProperty('client', pip_services3_commons_nodex_6.TypeCode.String)
            .withOptionalProperty('user', null)
            .withOptionalProperty('data', null), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsNullableString("user_id");
            let userName = args.getAsNullableString("user_name");
            let address = args.getAsNullableString("address");
            let client = args.getAsNullableString("client");
            let user = args.get("user");
            let data = args.get("data");
            return yield this._logic.openSession(correlationId, userId, userName, address, client, user, data);
        }));
    }
    makeStoreSessionDataCommand() {
        return new pip_services3_commons_nodex_2.Command("store_session_data", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('data', null), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let sessionId = args.getAsNullableString("session_id");
            let data = args.get("data");
            return yield this._logic.storeSessionData(correlationId, sessionId, data);
        }));
    }
    makeUpdateSessionUserCommand() {
        return new pip_services3_commons_nodex_2.Command("update_session_user", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('user', null), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let sessionId = args.getAsNullableString("session_id");
            let user = args.get("user");
            return yield this._logic.updateSessionUser(correlationId, sessionId, user);
        }));
    }
    makeCloseSessionCommand() {
        return new pip_services3_commons_nodex_2.Command("close_session", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let sessionId = args.getAsNullableString("session_id");
            return yield this._logic.closeSession(correlationId, sessionId);
        }));
    }
    makeCloseExpiredSessionsCommand() {
        return new pip_services3_commons_nodex_2.Command("close_expired_sessions", new pip_services3_commons_nodex_5.ObjectSchema(true), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            return yield this._logic.closeExpiredSessions(correlationId);
        }));
    }
    makeDeleteSessionByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_session_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let sessionId = args.getAsNullableString("session_id");
            return yield this._logic.deleteSessionById(correlationId, sessionId);
        }));
    }
}
exports.SessionsCommandSet = SessionsCommandSet;
//# sourceMappingURL=SessionsCommandSet.js.map