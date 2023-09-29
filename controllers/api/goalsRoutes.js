const router = require('express').Router();
const { Goals } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const newGoal = await Goals.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newGoal);
        } catch (err) {
           res.status(400).json(err); 
        }
    });


router.post('/goals', withAuth, async (req, res) => {
    try {
        const goalData = await Goals.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(goalData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const goalsData = await Goal.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!goalsData) {
            res.status(404).json({ message: 'No goal found with this id!' });
            return;
    }

    res.status(200).json(goalsData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;

