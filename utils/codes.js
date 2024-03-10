const ReturnCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerInternalError: 500,
}

const ErrorCode = {
  None: 20000,
  ParamError: 40001,
  NotFound: 40400,
  WriteError: 50001,
  ReadError: 50002,
  UpdateError: 50003,
  DeleteError: 50004,
}

module.exports = { ReturnCode, ErrorCode }
