const router = require('express').Router();
const { Goals } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/goals', async (req, res) => {
    try {
        const goalsData = await Goals.findAll();
        res.status(200).json(goalsData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/goals', withAuth, async (req, res) => {
    try {
        const newGoals = await Goals.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newGoals);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/goals/:id', withAuth, async(req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!projectData) {
            res.status(404).json({ message: 'No goal found with this id!' });
    }

    res.status(200).json(projectData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;

