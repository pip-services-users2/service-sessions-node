"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const SessionsMemoryPersistence_1 = require("./SessionsMemoryPersistence");
class SessionsFilePersistence extends SessionsMemoryPersistence_1.SessionsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.SessionsFilePersistence = SessionsFilePersistence;
//# sourceMappingURL=SessionsFilePersistence.js.map