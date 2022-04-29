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
exports.SessionsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class SessionsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('sessions');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let userId = filter.getAsNullableString('user_id');
        if (userId != null)
            criteria.push({ user_id: userId });
        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ request_time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ request_time: { $lt: toTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, '-request_time', { user: 0, data: 0 });
        });
    }
    create(correlationId, item) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null) {
                return;
            }
            let now = new Date();
            item.open_time = now;
            item.request_time = now;
            return yield _super.create.call(this, correlationId, item);
        });
    }
    update(correlationId, item) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null) {
                return;
            }
            let now = new Date();
            item.request_time = now;
            return yield _super.update.call(this, correlationId, item);
        });
    }
    closeExpired(correlation_id, request_time) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                request_time: { $lt: request_time },
                active: true
            };
            let newItem = {
                $set: {
                    active: false,
                    request_time: new Date(),
                    close_time: new Date(),
                    user: null,
                    data: null
                }
            };
            let options = {
                multi: true
            };
            yield this._collection.update(criteria, newItem, options, (err, count) => {
                if (count > 0)
                    this._logger.debug(correlation_id, 'Closed %d expired sessions', count);
            });
        });
    }
}
exports.SessionsMongoDbPersistence = SessionsMongoDbPersistence;
//# sourceMappingURL=SessionsMongoDbPersistence.js.map