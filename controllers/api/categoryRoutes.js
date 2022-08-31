const router = require('express').Router();
const { Game, Category, game_category_bridge } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const allCategories = await Category.findAll({
            attributes: ['id', 'category_name']
        });
        res.json(allCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleCategory = await Category.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'category_name',
            ],
            include: [
                {
                    model: Game,
                    attributes: [
                        'name',
                        'description',
                        'min_players',
                        'max_players',
                        'duration',
                        'age_rating'
                    ]
                }
            ]
        });
        if (!singleCategory) {
            res.status(404).json({ message: 'No category found with this ID' });
        }
        res.json(singleCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;