const router = require('express').Router();
const { Goals, User } = require('../models');
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

        const goals = goalsData.map((goal) => goal.get({ plain: true }));

        res.render('homepage', {
            goals,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/goal/:id', async (req, res) => {
    try {
      const goalData = await Goals.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const goal = goalData.get({ plain: true });
      console.log(goal)
  
      res.render('goals', {
        goal,
        logged_in: req.session.logged_in
      });
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });


router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findbyPk(req.session.user_id,{
            attributes: { exclude: ['password'] },
            include: [{ model: Goals }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            user,
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
