const {Category} = require('../models')

const categoryData = [
    {
        category_name: 'trivia'
    },
    {
        category_name: 'card'
    },
    {
        category_name: 'war'
    },
    {
        category_name: 'drawing'
    },
    {
        category_name: 'strategy'
    },
]
const seedCategory = () => Category.bulkCreate(categoryData)

module.exports = seedCategory