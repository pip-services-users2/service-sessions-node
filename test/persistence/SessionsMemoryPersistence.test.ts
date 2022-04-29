import { SessionsMemoryPersistence } from '../../src/persistence/SessionsMemoryPersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsMemoryPersistence', () => {
    let persistence: SessionsMemoryPersistence;
    let fixture: SessionsPersistenceFixture;
    
    setup(async () => {
        persistence = new SessionsMemoryPersistence();
        fixture = new SessionsPersistenceFixture(persistence);
        
        await persistence.open(null);
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