"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const SessionsMongoDbPersistence_1 = require("../persistence/SessionsMongoDbPersistence");
const SessionsFilePersistence_1 = require("../persistence/SessionsFilePersistence");
const SessionsMemoryPersistence_1 = require("../persistence/SessionsMemoryPersistence");
const SessionsController_1 = require("../logic/SessionsController");
const SessionsCommandableHttpServiceV1_1 = require("../services/version1/SessionsCommandableHttpServiceV1");
const SessionsCommandableGrpcServiceV1_1 = require("../services/version1/SessionsCommandableGrpcServiceV1");
const SessionsGrpcServiceV1_1 = require("../services/version1/SessionsGrpcServiceV1");
class SessionsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence_1.SessionsMemoryPersistence);
        this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence_1.SessionsFilePersistence);
        this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence_1.SessionsMongoDbPersistence);
        this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController_1.SessionsController);
        this.registerAsType(SessionsServiceFactory.CommandableHttpServiceDescriptor, SessionsCommandableHttpServiceV1_1.SessionsCommandableHttpServiceV1);
        this.registerAsType(SessionsServiceFactory.CommandableGrpcServiceDescriptor, SessionsCommandableGrpcServiceV1_1.SessionsCommandableGrpcServiceV1);
        this.registerAsType(SessionsServiceFactory.GrpcServiceDescriptor, SessionsGrpcServiceV1_1.SessionsGrpcServiceV1);
    }
}
exports.SessionsServiceFactory = SessionsServiceFactory;
SessionsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "factory", "default", "default", "1.0");
SessionsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "persistence", "memory", "*", "1.0");
SessionsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "persistence", "file", "*", "1.0");
SessionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "persistence", "mongodb", "*", "1.0");
SessionsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "controller", "default", "*", "1.0");
SessionsServiceFactory.CommandableHttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "service", "commandable-http", "*", "1.0");
SessionsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "service", "commandable-grpc", "*", "1.0");
SessionsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-sessions", "service", "grpc", "*", "1.0");
//# sourceMappingURL=SessionsServiceFactory.js.map