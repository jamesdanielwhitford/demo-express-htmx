// represents the jpa layer to fetch data from db
const Item = require('../model/item');

const getAllItems = async (req, res) => {
  const items = await Item.findAndCountAll();
  res.send({
    context: items.rows,
    total: items.count,
  });
};

const getItem = async (req, res) => {
  const id = req.params.id;
  await Item.findOne({ where: { id: id } }).then((item) => {
    if (item != null) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  });
};

const saveItem = async (req, res) => {
  const item = {
    tableHead1: req.body.tableHead1,
    tableHead2: req.body.tableHead2,
  };
  await Item.create(item).then((x) => {
    //console.log('id- ', x.null)
    // send id of recently created item
    res.send({ id: x.null });
  });
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  await Item.findByPk(id).then((item) => {
    if (item != null) {
      item
        .update({
          name: req.body.name,
          author: req.body.author,
        })
        .then(() => {
          res.sendStatus(204);
        });
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  //await Item.findByPk(id).then((item)
  await Item.findOne({ where: { id: id } }).then((item) => {
    if (item != null) {
      console.log('Item is ', item);
      item.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  getAllItems,
  getItem,
  saveItem,
  updateItem,
  deleteItem,
};
