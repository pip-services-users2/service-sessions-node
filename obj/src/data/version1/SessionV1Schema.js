"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SessionV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('user_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('user_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('active', pip_services3_commons_nodex_2.TypeCode.Boolean);
        this.withOptionalProperty('open_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('close_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('request_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('address', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('client', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('user', null);
        this.withOptionalProperty('data', null);
    }
}
exports.SessionV1Schema = SessionV1Schema;
//# sourceMappingURL=SessionV1Schema.js.map