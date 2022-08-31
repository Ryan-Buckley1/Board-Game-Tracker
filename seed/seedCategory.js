const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Trivia'
    },
    {
        category_name: 'Card'
    },
    {
        category_name: 'War'
    },
    {
        category_name: 'Drawing'
    },
    {
        category_name: 'Sports'
    },
    {
        category_name: 'Comedy'
    },
    {
        category_name: 'Dice'
    },
    {
        category_name: 'Horror'
    },
    {
        category_name: 'Fighting'
    },
    {
        category_name: 'Math'
    },
    {
        category_name: 'Mature/Adult'
    },
    {
        category_name: 'Anime'
    },
    {
        category_name: 'Puzzle'
    },
    {
        category_name: 'Fantasy'
    },
    {
        category_name: 'Medical'
    },
    {
        category_name: 'Exploration'
    },
    {
        category_name: 'Novel-based'
    },
    {
        category_name: 'Party Game'
    },
    {
        category_name: 'Miniatures'
    },
    {
        category_name: 'Word Game'
    },
    {
        category_name: 'Educational'
    },
    {
        category_name: 'Tabletop'
    },
    {
        category_name: 'Mafia'
    },
    {
        category_name: 'Memory'
    },
    {
        category_name: 'Racing'
    },
    {
        category_name: 'Multilingual'
    },
    {
        category_name: 'Expansion'
    },
    {
        category_name: 'Music'
    },
    {
        category_name: 'Economy'
    },
    {
        category_name: 'Electronic'
    },
    {
        category_name: 'Western'
    },
    {
        category_name: 'Bluffing'
    },
    {
        category_name: 'Colors'
    },
    {
        category_name: 'Mystery'
    },
    {
        category_name: 'Drinking'
    },
];
const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;