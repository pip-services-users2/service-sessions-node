import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class SessionsServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static CommandableHttpServiceDescriptor: Descriptor;
    static CommandableGrpcServiceDescriptor: Descriptor;
    static GrpcServiceDescriptor: Descriptor;
    constructor();
}
