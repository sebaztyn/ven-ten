/**
 *
 *
 * @class Response
 */
class Response {
  /**
   *
   *
   * @static
   * @param {Object} responseObj
   * @param {Object} destructuredObject
   * @returns {JSON} Returns a JSON Object
   * @memberof Response
   */
  static serverResponse({
    responseObj,
    statusValue,
    statusResult,
    data,
    dataValue,
    statusCodeValue,
  }) {
    return responseObj.status(statusValue).json({
      status: statusResult,
      statusCode: statusCodeValue,
      [data]: dataValue,
    });
  }
}

export default Response;
