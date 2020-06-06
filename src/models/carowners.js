"use strict";
module.exports = (sequelize, DataTypes) => {
  const Carowners = sequelize.define(
    "carowners",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.STRING,
      car_model: DataTypes.STRING,
      car_model_year: DataTypes.STRING,
      car_color: DataTypes.STRING,
      gender: DataTypes.STRING,
      job_title: DataTypes.STRING,
      bio: DataTypes.TEXT,
    },
    {},
  );
  Carowners.associate = function(models) {
    // associations can be defined here
  };
  return Carowners;
};
