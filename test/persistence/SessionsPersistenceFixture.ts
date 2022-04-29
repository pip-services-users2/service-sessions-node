const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';

import { ISessionsPersistence } from '../../src/persistence/ISessionsPersistence';
import { SessionV1 } from '../../src/data/version1/SessionV1';

let SESSION1: SessionV1 = new SessionV1(null, '1', 'User 1');
let SESSION2: SessionV1 = new SessionV1(null, '2', 'User 2');

export class SessionsPersistenceFixture {
    private _persistence: ISessionsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    public async testCrudOperations() {
        // Create one session
        let session1 = await this._persistence.create(null, SESSION1);

        assert.isObject(session1);
        assert.isNotNull(session1.id);
        assert.isNotNull(session1.open_time);
        assert.isNotNull(session1.request_time);
        assert.equal(session1.user_id, SESSION1.user_id);

        // Create another session
        let session2 = await this._persistence.create(null, SESSION2);

        assert.isObject(session2);
        assert.isNotNull(session2.id);
        assert.isNotNull(session2.open_time);
        assert.isNotNull(session2.request_time);
        assert.equal(session2.user_id, SESSION2.user_id);

        // Partially update
        let session = await this._persistence.updatePartially(
            null,
            session1.id,
            AnyValueMap.fromTuples(
                "data", "123"
            )
        );

        assert.isObject(session);
        assert.equal(session1.id, session.id);
        assert.equal("123", session.data);

        // Get user sessions
        let events = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples('user_id', '1'),
            new PagingParams()
        );

        assert.isObject(events);
        assert.lengthOf(events.data, 1);
    }

    public async testCloseExpired() {
        await this._persistence.closeExpired("", new Date());
    }

}
