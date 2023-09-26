const router = require('express').Router();
const { User, Goals } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const goalsData = await Goals.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const goals = goalsData.map((goals) => goals.get({ plain: true }));

        res.render('homepage', {
            goals,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/goals/:id'), async (req, res) => {
    try {
        const goalsData = await Goals.findbyPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const goals = goalsData.get({ plain: true });

        res.render('goals', {
            ...goals,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findbyPk(req.session.user_id,{
            attributes: { exclude: ['password'] },
            include: [{ model: Goals }],
        });

        const user = UserData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
