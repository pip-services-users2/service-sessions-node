const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { SessionV1 } from '../../src/data/version1/SessionV1';
import { SessionsLambdaFunction } from '../../src/container/SessionsLambdaFunction';


suite('SessionsLambdaFunction', ()=> {
    let lambda: SessionsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-sessions:persistence:memory:default:1.0',
            'controller.descriptor', 'service-sessions:controller:default:default:1.0'
        );

        lambda = new SessionsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Open Session', async () => {
        var session1: SessionV1;

        // Create a new session
        let session = await lambda.act(
            {
                role: 'sessions',
                cmd: 'open_session',
                user_id: '1',
                user_name: 'User 1',
                address: 'localhost',
                client: 'test',
                data: 'abc'
            }
        );

        assert.isObject(session);
        assert.isNotNull(session.id);
        assert.isNotNull(session.last_request);
        assert.equal(session.user_id, '1');
        assert.equal(session.user_name, 'User 1');
        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
        assert.equal(session.data, 'abc');

        session1 = session;
        
        // Store session data
        await lambda.act(
            {
                role: 'sessions',
                cmd: 'store_session_data',
                session_id: session1.id,
                data: 'xyz'
            }
        );

        // Update session user
        await lambda.act(
            {
                role: 'sessions',
                cmd: 'update_session_user',
                session_id: session1.id,
                user: 'xyz'
            }
        );

        // Open created session
        session = await lambda.act(
            {
                role: 'sessions',
                cmd: 'get_session_by_id',
                session_id: session1.id
            }
        );

        assert.isObject(session);
        assert.equal(session.id, session1.id);
        assert.isNotNull(session.last_request);
        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
        assert.equal(session.data, 'xyz');

        // Get open sessions
        let page = await lambda.act(
            {
                role: 'sessions',
                cmd: 'get_sessions',
                filter: {
                    user_id: '1'
                }
            }
        );

        assert.lengthOf(page.data, 1);
        session = page.data[0];

        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
    });

});