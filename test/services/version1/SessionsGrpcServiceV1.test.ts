const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsGrpcServiceV1 } from '../../../src/services/version1/SessionsGrpcServiceV1';
import { SessionsGrpcConverterV1 } from '../../../src/services/version1/SessionsGrpcConverterV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsGrpcServiceV1', ()=> {
    let service: SessionsGrpcServiceV1;
    let persistence: SessionsMemoryPersistence;

    let client: any;

    suiteSetup(async () => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sessions', 'service', 'grpc', 'default', '1.0'), service
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
            __dirname + "../../../../../src/protos/sessions_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).sessions_v1.Sessions;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        await persistence.clear(null);
    });

    test('Open Session', async () => {
        var session1: SessionV1;
        
        // Create a new session
        let response = await new Promise<any>((resolve, reject) => { 
            client.open_session(
                {
                    user_id: '1',
                    user_name: 'User 1',
                    address: 'localhost',
                    client: 'test',
                    data: SessionsGrpcConverterV1.toJson('abc')
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let session = response ? response.session : null;

        assert.isObject(session);
        assert.isNotNull(session.id);
        assert.isNotNull(session.last_request);
        assert.equal(session.user_id, '1');
        assert.equal(session.user_name, 'User 1');
        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
        assert.equal(SessionsGrpcConverterV1.fromJson(session.data), 'abc');

        session1 = session;


        // Store session data
        response = await new Promise<any>((resolve, reject) => {
            client.store_session_data(
                {
                    session_id: session1.id,
                    data: SessionsGrpcConverterV1.toJson('xyz')
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);
        
        // Get opened session
        response = await new Promise<any>((resolve, reject) => {
            client.get_session_by_id(
                {
                    session_id: session1.id
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        session = response ? response.session : null;

        assert.isNull(response.error);

        assert.isObject(session);
        assert.equal(session.id, session1.id);
        assert.isNotNull(session.last_request);
        assert.equal(SessionsGrpcConverterV1.fromJson(session.data), 'xyz');

        // Get open sessions
        response = await new Promise<any>((resolve, reject) => {
            client.get_sessions(
                {
                    filter: { user_id: '1' }
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });
        
        let page = response ? response.page : null;

        assert.isNull(response.error);

        assert.lengthOf(page.data, 1);
        session = page.data[0];

        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
    });

    test('Close Session', async () => {
        let session1: SessionV1;

        // Create a new session
        let response = await new Promise<any>((resolve, reject) => {
            client.open_session(
                {
                    user_id: '1',
                    user_name: 'User 1',
                    address: 'localhost',
                    client: 'test'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let session = response ? response.session : null;

        assert.isNull(response.error);

        assert.isObject(session);
        assert.isNotNull(session.last_request);

        session1 = session;

        // Close session
        response = await new Promise<any>((resolve, reject) => {
            client.close_session(
                {
                    session_id: session1.id
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        assert.isNull(response.error);

        // Get open sessions
        response = await new Promise<any>((resolve, reject) => {
            client.get_sessions(
                {
                    filter: {
                        user_id: '1',
                        active: true
                    }
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let page = response ? response.page : null;

        assert.isNull(response.error);
        assert.lengthOf(page.data, 0);
    });

});
