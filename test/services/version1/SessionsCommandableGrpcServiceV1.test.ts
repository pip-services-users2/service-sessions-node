const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsCommandableGrpcServiceV1 } from '../../../src/services/version1/SessionsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsCommandableGrpcServiceV1', ()=> {
    let service: SessionsCommandableGrpcServiceV1;
    let persistence: SessionsMemoryPersistence;

    let client: any;

    suiteSetup(async () => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sessions', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        await persistence.clear(null);
    });

    test('Open Session', async () => {
        var session1: SessionV1;

        // Create a new session
        let response = await new Promise<any>((resolve, reject) => { 
            client.invoke(
                {
                    method: 'v1/sessions.open_session',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test',
                        data: 'abc'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let session = JSON.parse(response.result_json);

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
        response = await new Promise<any>((resolve, reject) => { 
            client.invoke(
                {
                    method: 'v1/sessions.store_session_data',
                    args_empty: false,
                    args_json: JSON.stringify({
                        session_id: session1.id,
                        data: 'xyz'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);

        // Get opened session
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/sessions.get_session_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        session_id: session1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        session = JSON.parse(response.result_json);

        assert.isObject(session);
        assert.equal(session.id, session1.id);
        assert.isNotNull(session.last_request);
        assert.equal(session.data, 'xyz');

        // Get open sessions
        response = await new Promise<any>((resolve, reject) => { 
            client.invoke(
                {
                    method: 'v1/sessions.get_sessions',
                    args_empty: false,
                    args_json: JSON.stringify({
                        filter: { user_id: '1' }
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.lengthOf(page.data, 1);
        session = page.data[0];

        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
    });

    test('Close Session', async () => {
        let session1: SessionV1;

        // Create a new session
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/sessions.open_session',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let session = JSON.parse(response.result_json);

        assert.isObject(session);
        assert.isNotNull(session.last_request);

        session1 = session;

        // Close session
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/sessions.close_session',
                    args_empty: false,
                    args_json: JSON.stringify({
                        session_id: session1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);


        // Get open sessions
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/sessions.get_sessions',
                    args_empty: false,
                    args_json: JSON.stringify({
                        filter: {
                            user_id: '1',
                            active: true
                        }
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.lengthOf(page.data, 0);
    });
    
});
