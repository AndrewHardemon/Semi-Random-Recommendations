const router = require('express').Router();
const { User, List, Item } = require('../../models');

router.post('/', (req, res) => {
  console.log(req.body)
  List.create({
    ...req.body,
    user_id: req.session.userId
  })
    .then(dbListData => {
      res.json(dbListData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/item', (req, res) => {
  console.log(req.body.name, req.body.list_id)
  Item.create({
    name: req.body.name,
    list_id: req.body.list_id
  })
    .then(dbItemData => {
      res.json(dbItemData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
