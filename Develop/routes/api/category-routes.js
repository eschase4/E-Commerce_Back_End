const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    categoryData = await Category.findAll({
      // include: [{model: Product}],
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    if (!categoryData) {
      res.status(404).json({message: 'No category with this ID found.'})
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  //should just be
  //{
      // "category_name": "new_category"
  // }
  Category.create(req.body)
    .then((newCategory) => {
      res.status(200).json(newCategory)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    res.status(200).json(updatedCategory)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Product.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((deletedCategory) => {
    res.status(200).json(deletedCategory)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

module.exports = router;
