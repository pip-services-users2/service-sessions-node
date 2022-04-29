import { CommandSet } from 'pip-services3-commons-nodex';
import { ISessionsController } from './ISessionsController';
export declare class SessionsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISessionsController);
    private makeGetSessionsCommand;
    private makeGetSessionByIdCommand;
    private makeOpenSessionCommand;
    private makeStoreSessionDataCommand;
    private makeUpdateSessionUserCommand;
    private makeCloseSessionCommand;
    private makeCloseExpiredSessionsCommand;
    private makeDeleteSessionByIdCommand;
}
