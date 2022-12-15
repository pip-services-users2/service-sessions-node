const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsCommandableHttpServiceV1 } from '../../../src/services/version1/SessionsCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsCommandableHttpServiceV1', ()=> {
    let persistence: SessionsMemoryPersistence;
    let service: SessionsCommandableHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sessions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        await persistence.clear(null);
    });
    
    test('Open Session', async () => {
        var session1: SessionV1;

        // Create a new session
        let session = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/open_session',
                {
                    user_id: '1',
                    user_name: 'User 1',
                    address: 'localhost',
                    client: 'test',
                    data: 'abc'
                },
                (err, req, res, session) => {
                    if (err == null) resolve(session);
                    else reject(err);
                }
            );
        });

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
        await new Promise<any>((resolve, reject) => { 
            rest.post('/v1/sessions/store_session_data',
                {
                    session_id: session1.id,
                    data: 'xyz'
                },
                (err, req, res) => {
                    if (err == null) resolve(null);
                    else reject(err);
                }
            );
        });
        
        // Get opened session
        session = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/get_session_by_id',
                {
                    session_id: session1.id
                },
                (err, req, res, session) => {
                    if (err == null) resolve(session);
                    else reject(err);
                }
            );
        });

        assert.isObject(session);
        assert.equal(session.id, session1.id);
        assert.isNotNull(session.last_request);
        assert.equal(session.data, 'xyz');

        // Get open sessions
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/get_sessions',
                {
                    filter: { user_id: '1' }
                },
                (err, req, res, page) => {
                    if (err == null) resolve(page);
                    else reject(err);
                }
            );
        });
        
        assert.lengthOf(page.data, 1);
        session = page.data[0];

        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
    });

    test('Close Session', async () => {
        let session1: SessionV1;

        // Create a new session
        let session = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/open_session',
                {
                    user_id: '1',
                    user_name: 'User 1',
                    address: 'localhost',
                    client: 'test'
                },
                (err, req, res, session) => {
                    if (err == null) resolve(session);
                    else reject(err);
                }
            );
        });

        assert.isObject(session);
        assert.isNotNull(session.last_request);

        session1 = session;

        // Close session
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/close_session',
                {
                    session_id: session1.id
                },
                (err, req, res, session) => {
                    if (err == null) resolve(session);
                    else reject(err);
                }
            );
        });

        // Get open sessions
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/sessions/get_sessions',
                {
                    filter: {
                        user_id: '1',
                        active: true
                    }
                },
                (err, req, res, page) => {
                    if (err == null) resolve(page);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(page.data, 0);
    });
});