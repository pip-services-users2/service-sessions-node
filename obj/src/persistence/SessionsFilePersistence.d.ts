import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { SessionsMemoryPersistence } from './SessionsMemoryPersistence';
import { SessionV1 } from '../data/version1/SessionV1';
export declare class SessionsFilePersistence extends SessionsMemoryPersistence {
    protected _persister: JsonFilePersister<SessionV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
