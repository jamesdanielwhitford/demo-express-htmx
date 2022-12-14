const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require("./app/routes/bookRoutes");
const sequelize = require("./app/model/dbconfig");
const Book = require("./app/model/book");


// automatically creating table on startup
sequelize.sync({ force: true }).then(async () => {
  console.log("db is ready...");
});

const app = express();
app.use(express.json());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
// application routes
app.use("/api", bookRoutes.routes);

app.get('/', async (req, res) => {
  const books = await Book.findAndCountAll();
  var x = process.env.x
  if (x == 'pizza') {
    head = 'Pizza Reccomendations';
  } else {
    head = 'Book Reccomendations';
  }
  return res.render('index', {books: books.rows, heading: process.env.heading, tableHeading1: process.env.tableHeading1, tableHeading2: process.env.tableHeading2});
});

app.get('/get-book-row/:id', async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ where: { id: id } }).then((book) => {
    return res.send(`<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>
        <button class="btn btn-primary"
            hx-get="/get-edit-form/${id}">
            Edit Book
        </button>
    </td>
    <td>
        <button hx-delete="/delete/${id}"
            class="btn btn-primary">
            Delete
        </button>
    </td>
</tr>`);
  });
});

app.get('/get-edit-form/:id', async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ where: { id: id } }).then((book) => {
    return res.send(`<tr hx-trigger='cancel' class='editing' hx-get="/get-book-row/${id}">
    <td><input name="title" value="${book.name}"/></td>
    <td><input name="author" value="${book.author}"/></td>
    <td>
      <button class="btn btn-primary" hx-get="/get-book-row/${id}">
        Cancel
      </button>
      <button class="btn btn-primary" hx-put="/update/${id}" hx-include="closest tr">
        Save
      </button>
    </td>
  </tr>`);
  });
});

app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  // update book
  await Book.findByPk(id).then((item) => {
      item
        .update({
          name: req.body.title,
          author: req.body.author
        })
        .then(() => {
          return res.send(`<tr>
    <td>${req.body.title}</td>
    <td>${req.body.author}</td>
    <td>
        <button class="btn btn-primary"
            hx-get="/get-edit-form/${id}">
            Edit Book
        </button>
    </td>
    <td>
        <button hx-delete="/delete/${id}"
            class="btn btn-primary">
            Delete
        </button>
    </td>
</tr>`);
        });
  });
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ where: { id: id } }).then((book) => {
      book.destroy();
      return res.send("");
  });
});

app.post('/submit', async (req, res) => {
  console.log('body - ', req.body);
  const book = {
    name: req.body.title,
    author: req.body.author
  };
  await Book.create(book).then((x) => {
      //console.log('id- ', x.null)
      // send id of recently created item
    return res.send(`<tr>
    <td>${req.body.title}</td>
    <td>${req.body.author}</td>
    <td>
        <button class="btn btn-primary"
            hx-get="/get-edit-form/${x.null}">
            Edit Book
        </button>
    </td>
    <td>
        <button hx-delete="/delete/${x.null}}"
            class="btn btn-primary">
            Delete
        </button>
    </td>
</tr>`);
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
});