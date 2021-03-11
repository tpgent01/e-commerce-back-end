const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ],
        through: ProductTag,
        as: 'tagIds'
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ],
        through: ProductTag,
        as: 'tagIds'
      }
    ]
  })
  .then(dbTagData => {
    // see if a tag matched the id
    if(!dbTagData) {
        // if false
        res.status(404).json({ message: 'No tag found with this id'});
        return;
    }
    // if true
    res.json(dbTagData);
  })
  // if error - catch it and send response
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
