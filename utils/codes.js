const ReturnCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerInternalError: 500,
};

const ErrorCode = {
  None: 0,
  ParamError: 1,
  WriteError: 2,
  ReadError: 3,
  UpdateError: 4,
  DeleteError: 5,
};

module.exports = { ReturnCode, ErrorCode };
