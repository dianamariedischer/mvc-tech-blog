const { User } = require('../models');

const userData = [
  {
    username: 'dianadischer',
    password: '$2b$10$6eHXlCRta7p1GpsYIz.yzempDXk51sONKLWG/fsK7v1VQckmzmuby',
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;