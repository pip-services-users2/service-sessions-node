# Seneca Protocol (version 1) <br/> Sessions Microservice

Sessions microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8807, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
let result = await seneca.act(
    {
        role: 'sessions',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    }
);
```

* [SessionV1 class](#class1)
* [cmd: 'get_sessions'](#operation1)
* [cmd: 'get_session_by_id'](#operation2)
* [cmd: 'open_session'](#operation3)
* [cmd: 'store_session_data'](#operation4)
* [cmd: 'close_session'](#operation5)
* [cmd: 'delete_session_by_id'](#operation6)

## Data types

### <a name="class1"></a> SessionV1 class

Represents an open user session

**Properties:**
- id: string - unique session id
- user_id: string - unique user id
- user_name: string - Full user name just for information
- active: boolean - True if session is still active
- open_time: Date - date and time when session was opened
- request_time: Date - date and time when last request was processed
- close_time: Date - date and time when session was closed
- address: string - client address
- client: string - client application name
- user: Object - information about user
- data: Object - session data

## Operations

### <a name="operation1"></a> Cmd: 'get_sessions'

Retrieves all opened user sessions.

**Arguments:** 
- filter: object - filter parameters
  - user_id: string - (optional) unique user id
  - active: boolean - (optional) active connections
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<SessionV1> - page of retrieved user sessions

### <a name="operation2"></a> Cmd: 'get\_session\_by_id'

Load opened user session by user id and session id.

**Request body:** 
- session_id: string - unique session id

**Returns:**
- err: Error - occured error or null for success
- result: SessionV1 - open user session or null if session wasn't found

### <a name="operation3"></a> Cmd: 'open_session'

Opens a new user session and stores user information in it.

**Request body:** 
- user_id: string - unique user id
- user_name: string - full user name
- address: string - client address
- client: string - client application name
- data: Object - session data
- user: Object - user data

**Returns:**
- err: Error - occured error or null for success
- result: SessionV1 - newly opened user session or existing session if it was already opened for the same address and client

### <a name="operation4"></a> Cmd: 'store\_session\_data'

Stores session data

**Arguments:** 
- session_id: string - unique session id
- data: Object - session data

**Returns:**
- err: Error - occured error or null for success
- result: SessionV1 - updated SessionV1 object

### <a name="operation5"></a> Cmd: 'close_session'

Closes previously opened user session by its id

**Arguments:** 
- session_id: string - unique session id

**Returns:**
- err: Error - occured error or null for success

### <a name="operation6"></a> Cmd: 'delete_session'

Deletes session by specified session ids.

**Arguments:** 
- session_id: string - unique session id

**Returns:**
- err: Error - occured error or null for success

