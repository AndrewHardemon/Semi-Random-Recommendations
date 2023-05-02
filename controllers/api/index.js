const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const listRoutes = require('./list-routes.js');
const dataRoutes = require("./data-routes.js")


router.use('/user', userRoutes);
router.use('/list', listRoutes);
router.use('/', dataRoutes);

module.exports = router;