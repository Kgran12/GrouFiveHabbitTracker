const router = require('express').Router();
const userRoutes = require('./userRoutes');
const goalsRoutes = require('./goalsRoutes');

router.use('/users', userRoutes);
router.use('/goals', goalsRoutes);

module.exports = router;
