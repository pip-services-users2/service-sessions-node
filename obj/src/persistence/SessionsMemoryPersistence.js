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
exports.SessionsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class SessionsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let userId = filter.getAsNullableString('user_id');
        let active = filter.getAsNullableBoolean('active');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (userId != null && userId != item.user_id)
                return false;
            if (active != null && active != item.active)
                return false;
            if (fromTime != null && item.request_time >= fromTime)
                return false;
            if (toTime != null && item.request_time < toTime)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
            page.data = page.data.map(item => {
                let filtered = Object.entries(item).filter(([key]) => !['user', 'data'].includes(key));
                return Object.fromEntries(filtered);
            });
            return page;
        });
    }
    create(correlationId, item) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null)
                return;
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
            let time = request_time.getTime();
            let now = new Date();
            let count = 0;
            for (let item of this._items) {
                if (item.active && item.request_time.getTime() < time) {
                    item.active = false;
                    item.close_time = now;
                    item.request_time = now;
                    item.data = null;
                    item.user = null;
                    count++;
                }
            }
            if (count > 0) {
                this._logger.debug(correlation_id, 'Closed %d expired sessions', count);
                yield this.save(correlation_id);
            }
        });
    }
}
exports.SessionsMemoryPersistence = SessionsMemoryPersistence;
//# sourceMappingURL=SessionsMemoryPersistence.js.map