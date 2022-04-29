import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { SessionsMemoryPersistence } from './SessionsMemoryPersistence';
import { SessionV1 } from '../data/version1/SessionV1';

export class SessionsFilePersistence extends SessionsMemoryPersistence {
	protected _persister: JsonFilePersister<SessionV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<SessionV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}