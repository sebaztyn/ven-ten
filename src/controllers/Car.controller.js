import CarServices from "../services/index.js";

const { getCars } = CarServices;
/**
 *
 *
 * @class UserController
 */
class CarsController {
  /**
   *
   *
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @returns {JSON} returns a JSON object
   * @memberof CarsController
   */
  static async getCarsData(request, response, next) {
    try {
      const { query } = request;
      const carData = await getCars(query, response, next);
      return carData;
    } catch (error) {
      next(error);
    }
  }
}

export default CarsController;
