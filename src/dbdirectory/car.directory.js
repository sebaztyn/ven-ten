import models from "../models/index.js";

const { carowners } = models;

/**
 *
 *
 * @class CarsDBServices
 */
class CarsDBDirectory {
  /**
   *
   *
   * @static
   * @param {*} email
   * @param {*} nextFunction
   * @memberof UserDBServices
   * @return {Object} returns database object
   */
  static async findByParameters(params, nextFunction) {
    try {
      const userDetails = await carowners.findAll({
        where: { ...params },
        raw: true,
      });
      return userDetails;
    } catch (error) {
      nextFunction(error);
    }
  }
}

export default CarsDBDirectory;
