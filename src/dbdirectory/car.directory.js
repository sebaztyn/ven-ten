/* eslint-disable camelcase */
/* eslint-disable indent */
import { Op } from "sequelize";
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
    const { countries, colors, start_year, end_year, gender } = params;
    const startDate = +start_year;
    const endDate = +end_year;
    try {
      const userDetails = await carowners.findAll({
        where: {
          ...(colors ? { car_color: { [Op.or]: [...colors.split("-")] } } : {}),
          ...(countries
            ? { country: { [Op.or]: [...countries.split("-")] } }
            : {}),
          ...(start_year && !end_year
            ? { car_model_year: { [Op.gte]: startDate } }
            : {}),
          ...(!start_year && end_year
            ? { car_model_year: { [Op.lte]: endDate } }
            : {}),
          ...(start_year && end_year
            ? { car_model_year: { [Op.between]: [startDate, endDate] } }
            : {}),
          ...(gender ? { gender: { [Op.eq]: gender } } : {}),
        },
        raw: true,
      });
      return userDetails;
    } catch (error) {
      nextFunction(error);
    }
  }
}

export default CarsDBDirectory;
