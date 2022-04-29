import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { SessionsMongoDbPersistence } from '../persistence/SessionsMongoDbPersistence';
import { SessionsFilePersistence } from '../persistence/SessionsFilePersistence';
import { SessionsMemoryPersistence } from '../persistence/SessionsMemoryPersistence';
import { SessionsController } from '../logic/SessionsController';
import { SessionsHttpServiceV1 } from '../services/version1/SessionsHttpServiceV1';
import { SessionsCommandableGrpcServiceV1 } from '../services/version1/SessionsCommandableGrpcServiceV1';
import { SessionsGrpcServiceV1 } from '../services/version1/SessionsGrpcServiceV1';

export class SessionsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-sessions", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-sessions", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-sessions", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-sessions", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-sessions", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-sessions", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-sessions", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-sessions", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence);
		this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence);
		this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence);
		this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController);
		this.registerAsType(SessionsServiceFactory.HttpServiceDescriptor, SessionsHttpServiceV1);
		this.registerAsType(SessionsServiceFactory.CommandableGrpcServiceDescriptor, SessionsCommandableGrpcServiceV1);
		this.registerAsType(SessionsServiceFactory.GrpcServiceDescriptor, SessionsGrpcServiceV1);
	}
	
}
