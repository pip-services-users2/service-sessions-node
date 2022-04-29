# HTTP REST Protocol (version 1) <br/> Sessions Microservice

Sessions microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [SessionV1 class](#class1)
* [POST /sessions/get_sessions](#operation1)
* [POST /sessions/get_session_by_id](#operation2)
* [POST /sessions/open_session](#operation3)
* [POST /sessions/store_session_data](#operation4)
* [POST /sessions/close_session](#operation5)
* [POST /sessions/delete_session_by_id](#operation6)

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

### <a name="operation1"></a> Method: 'POST', route '/sessions/get_sessions'

Retrieves all opened user sessions or a specified session.

**Request body:** 
- filter: object - filter parameters
  - user_id: string - (optional) unique user id
  - active: boolean - (optional) active connections
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)

**Response body:**
DataPage<SessionV1> object or error

### <a name="operation2"></a> Method: 'POST', route '/sessions/get\_session\_by_id'

Load opened user session by user id and session id.

**Request body:**
- session_id: string - unique session id
- data: Object - session data

**Response body:**
Occurred error or null for success

### <a name="operation3"></a> Method: 'POST', route '/sessions/open_session'

Opens a new user session and stores user information in it.

**Request body:**
- user_id: string - unique user id
- user_name: string - full user name
- address: string - client address
- client: string - client application name
- user: Object - user data
- data: Object - session data

**Response body:**
Created SessionV1 or error

### <a name="operation4"></a> Method: 'POST', route '/sessions/store\_session\_data'

Stores session data

**Request body:** 
- session_id: string - unique session id
- data: Object - session data

**Response body:**
Updated SessionV1 or error

### <a name="operation5"></a> Method: 'POST', route '/sessions/close_session'

Closes user session either by its id

**Request body:** 
- session_id: (optional) string - unique session id

**Response body:**
Closed SessionV1 or error


### <a name="operation6"></a> Method: 'POST', route '/sessions/delete\_session\_by_id'

Deletes session by specified session ids.

**Request body:** 
- session_id: (optional) string - unique session id

**Response body:**
Deleted SessionV1 or error
