// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var sessions_v1_pb = require('./sessions_v1_pb.js');

function serialize_sessions_v1_SessionEmptyReply(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionEmptyReply)) {
    throw new Error('Expected argument of type sessions_v1.SessionEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionEmptyReply(buffer_arg) {
  return sessions_v1_pb.SessionEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionEmptyRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionEmptyRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionEmptyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionEmptyRequest(buffer_arg) {
  return sessions_v1_pb.SessionEmptyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionIdRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionIdRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionIdRequest(buffer_arg) {
  return sessions_v1_pb.SessionIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionObjectReply(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionObjectReply)) {
    throw new Error('Expected argument of type sessions_v1.SessionObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionObjectReply(buffer_arg) {
  return sessions_v1_pb.SessionObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionOpenRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionOpenRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionOpenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionOpenRequest(buffer_arg) {
  return sessions_v1_pb.SessionOpenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionPageReply(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionPageReply)) {
    throw new Error('Expected argument of type sessions_v1.SessionPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionPageReply(buffer_arg) {
  return sessions_v1_pb.SessionPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionPageRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionPageRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionPageRequest(buffer_arg) {
  return sessions_v1_pb.SessionPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionStoreDataRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionStoreDataRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionStoreDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionStoreDataRequest(buffer_arg) {
  return sessions_v1_pb.SessionStoreDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sessions_v1_SessionUpdateUserRequest(arg) {
  if (!(arg instanceof sessions_v1_pb.SessionUpdateUserRequest)) {
    throw new Error('Expected argument of type sessions_v1.SessionUpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sessions_v1_SessionUpdateUserRequest(buffer_arg) {
  return sessions_v1_pb.SessionUpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The sessions service definition.
var SessionsService = exports.SessionsService = {
  get_sessions: {
    path: '/sessions_v1.Sessions/get_sessions',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionPageRequest,
    responseType: sessions_v1_pb.SessionPageReply,
    requestSerialize: serialize_sessions_v1_SessionPageRequest,
    requestDeserialize: deserialize_sessions_v1_SessionPageRequest,
    responseSerialize: serialize_sessions_v1_SessionPageReply,
    responseDeserialize: deserialize_sessions_v1_SessionPageReply,
  },
  get_session_by_id: {
    path: '/sessions_v1.Sessions/get_session_by_id',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionIdRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionIdRequest,
    requestDeserialize: deserialize_sessions_v1_SessionIdRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
  open_session: {
    path: '/sessions_v1.Sessions/open_session',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionOpenRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionOpenRequest,
    requestDeserialize: deserialize_sessions_v1_SessionOpenRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
  store_session_data: {
    path: '/sessions_v1.Sessions/store_session_data',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionStoreDataRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionStoreDataRequest,
    requestDeserialize: deserialize_sessions_v1_SessionStoreDataRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
  update_session_user: {
    path: '/sessions_v1.Sessions/update_session_user',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionUpdateUserRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionUpdateUserRequest,
    requestDeserialize: deserialize_sessions_v1_SessionUpdateUserRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
  close_session: {
    path: '/sessions_v1.Sessions/close_session',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionIdRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionIdRequest,
    requestDeserialize: deserialize_sessions_v1_SessionIdRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
  close_expired_sessions: {
    path: '/sessions_v1.Sessions/close_expired_sessions',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionEmptyRequest,
    responseType: sessions_v1_pb.SessionEmptyReply,
    requestSerialize: serialize_sessions_v1_SessionEmptyRequest,
    requestDeserialize: deserialize_sessions_v1_SessionEmptyRequest,
    responseSerialize: serialize_sessions_v1_SessionEmptyReply,
    responseDeserialize: deserialize_sessions_v1_SessionEmptyReply,
  },
  delete_session_by_id: {
    path: '/sessions_v1.Sessions/delete_session_by_id',
    requestStream: false,
    responseStream: false,
    requestType: sessions_v1_pb.SessionIdRequest,
    responseType: sessions_v1_pb.SessionObjectReply,
    requestSerialize: serialize_sessions_v1_SessionIdRequest,
    requestDeserialize: deserialize_sessions_v1_SessionIdRequest,
    responseSerialize: serialize_sessions_v1_SessionObjectReply,
    responseDeserialize: deserialize_sessions_v1_SessionObjectReply,
  },
};

exports.SessionsClient = grpc.makeGenericClientConstructor(SessionsService);
