export default (sequelize, DataTypes) => {
  const carowners = sequelize.define(
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
  carowners.associate = (models) => {
    // associations can be defined here
  };
  return carowners;
};
