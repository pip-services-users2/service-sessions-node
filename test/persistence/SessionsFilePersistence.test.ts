import { ConfigParams } from 'pip-services3-commons-nodex';

import { SessionsFilePersistence } from '../../src/persistence/SessionsFilePersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsFilePersistence', ()=> {
    let persistence: SessionsFilePersistence;
    let fixture: SessionsPersistenceFixture;
    
    setup(async () => {
        persistence = new SessionsFilePersistence('./data/sessions.test.json');

        fixture = new SessionsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
       await fixture.testCrudOperations();
    });

    test('Close Expired', async () => {
        await fixture.testCloseExpired();
    });

});