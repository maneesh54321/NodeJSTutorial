require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id }).then((todos) => res.status(200).send({ todos }), (e) => res.status(400).send(e));
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid id');
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send('No todo found!!');
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

// app.delete('/todos/:id', authenticate, (req, res) => {
//     let id = req.params.id;
//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send('Invalid id');
//     }
//     Todo.findOneAndRemove({
//         _id: id,
//         _creator: req.user._id
//     }).then((todo) => {
//         if (!todo) {
//             return res.status(404).send('No todo found!!');
//         }
//         res.send({ todo });
//     }).catch((e) => {
//         res.status(400).send();
//     });
// });

app.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        let id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send('Invalid id');
        }
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });
        if (!todo) {
            return res.status(404).send('No todo found!!');
        }
        res.send({ todo });
    } catch (error) {
        res.status(400).send();
    }
});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid id!!');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    },
        { $set: body }, { new: true }).then((todo) => { //new:true forces node to return updated documnent
            if (!todo) {
                return res.status(404).send('todo not found!!');
            }

            res.send({ todo });
        }).catch((e) => res.status(400).send());
});

// app.post('/users', (req, res) => {
//     let body = _.pick(req.body, ['email', 'password']);
//     let user = new User(body);

//     user.generateAuthToken().then((token) => {
//         res.header('x-auth', token).send(user);
//     }).catch((err) => {
//         res.status(400).send(err);
//     });
// });

app.post('/users', async (req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// app.post('/users/login', (req, res) => {
//     let body = _.pick(req.body, ['email', 'password']);

//     User.findByCredentials(body.email, body.password).then((user) => {
//         return user.generateAuthToken().then((token) => {
//             res.header('x-auth', token).send(user);
//         });
//     }).catch((e) => {
//         res.status(400).send();
//     });
// });

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send();
    }
});

// app.delete('/users/me/token', authenticate, (req, res) => {
//     req.user.removeToken(req.token).then(() => {
//         res.status(200).send();
//     }, () => {
//         res.status(400).send();
//     });
// });

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = { app };