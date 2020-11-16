const express = require('express');
const { Op } = require('sequelize');
const db = require('../config/db');
const Covid = require('../models/Covid');

const router = express.Router();

router.get('/all', (req, res) => {
  Covid.findAll()
    .then(covid => {
      res.status(200).json(covid);
    })
    .catch(err => console.log(err));
});

router.get('/:country/:state', (req, res) => {
  Covid.findAll({
    where: {
      country: {
        [Op.like]: req.params.country 
      },
      state: {
        [Op.like]: req.params.state 
      }
    }
  })
  .then(covid => {
    res.status(200).json(covid);
  })
  .catch(err => console.log(err));
});

router.get('/:country', (req, res) => {
  console.log(req.params.country );
  Covid.findAll({
    where: {
      country: {
        [Op.like]: req.params.country 
      },
      state: ''
    }
  })
  .then(covid => {
    res.status(200).json(covid);
  })
  .catch(err => console.log(err));
});

module.exports = router;