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
exports.SessionsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const SessionV1_1 = require("../data/version1/SessionV1");
const SessionsCommandSet_1 = require("./SessionsCommandSet");
class SessionsController {
    constructor() {
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(SessionsController._defaultConfig);
        this._expireTimeout = 24 * 3600000;
        this._cleanupInterval = 900000;
    }
    configure(config) {
        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
        this._cleanupInterval = config.getAsLongWithDefault('options.cleanup_interval', this._cleanupInterval);
        this._logger.configure(config);
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet_1.SessionsCommandSet(this);
        return this._commandSet;
    }
    isOpen() {
        return this._cleanupTimer != null;
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cleanupTimer) {
                return;
            }
            this._cleanupTimer = new pip_services3_commons_nodex_5.FixedRateTimer(() => {
                this._logger.info(correlationId, 'Closing expired user sessions');
                this.closeExpiredSessions(correlationId);
            }, this._cleanupInterval);
            this._cleanupTimer.start();
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cleanupTimer) {
                this._cleanupTimer.stop();
                this._cleanupTimer = null;
            }
        });
    }
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, sessionId);
        });
    }
    openSession(correlationId, user_id, user_name, address, client, user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = new SessionV1_1.SessionV1(pip_services3_commons_nodex_3.IdGenerator.nextLong(), user_id, user_name, address, client);
            session.user = user;
            session.data = data;
            return yield this._persistence.create(correlationId, session);
        });
    }
    storeSessionData(correlationId, sessionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_nodex_4.AnyValueMap.fromTuples('request_time', new Date(), 'data', data));
        });
    }
    updateSessionUser(correlationId, sessionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_nodex_4.AnyValueMap.fromTuples('request_time', new Date(), 'user', user));
        });
    }
    closeSession(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_nodex_4.AnyValueMap.fromTuples('active', false, 'request_time', new Date(), 'close_time', new Date(), 'data', null, 'user', null));
        });
    }
    closeExpiredSessions(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date().getTime();
            let requestTime = new Date(now - this._expireTimeout);
            return yield this._persistence.closeExpired(correlationId, requestTime);
        });
    }
    deleteSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.deleteById(correlationId, sessionId);
        });
    }
}
exports.SessionsController = SessionsController;
SessionsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('options.cleanup_interval', 900000, 'options.expire_timeout', 24 * 3600000, 'dependencies.persistence', 'service-sessions:persistence:*:*:1.0');
//# sourceMappingURL=SessionsController.js.map