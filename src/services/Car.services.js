import CarsDBDirectory from "../dbdirectory/index.js";

import Response from "../utils/Response.js";

const { findByParameters } = CarsDBDirectory;
const { serverResponse } = Response;

/**
 *
 *@description
 * @class CarServices
 */
class CarServices {
  /**
   *
   *
   * @static
   * @param {*} body
   * @param {*} responseObj
   * @param {*} nextFunction
   * @memberof UserServices
   * @returns {Object} returns a new user
   */
  static async getCars(queries, responseObj, nextFunction) {
    try {
      const fetchCars = await findByParameters(queries, nextFunction);
      if (Array.isArray(fetchCars) && !fetchCars.length) {
        return responseObj.status(200).json({
          status: "success",
          statusCode: 200,
          message: "No Data returned",
        });
      }
      const dataObj = {
        responseObj,
        statusValue: 200,
        statusResult: "success",
        data: "data",
        dataValue: fetchCars,
        statusCodeValue: 200,
      };
      return serverResponse(dataObj);
    } catch (error) {
      nextFunction(error);
    }
  }
}

export default CarServices;
