import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class SessionV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('user_id', TypeCode.String);
        this.withRequiredProperty('user_name', TypeCode.String);
        this.withOptionalProperty('active', TypeCode.Boolean);
        this.withOptionalProperty('open_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('close_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('request_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('address', TypeCode.String);
        this.withOptionalProperty('client', TypeCode.String);
        this.withOptionalProperty('user', null);
        this.withOptionalProperty('data', null);
    }
}
