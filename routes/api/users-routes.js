const router = require('express').Router();
const { User, Thought } = require('../../models');

// find All Users
router.get('/', async (req, res) => {
    const users = await User.find();
    if(users) {
        res.json(users);
    } else {
        res.end("No Data");
    };
});

// find One User
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        id: id,
    });
    if(users) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// create new User
router.post('/', (req, res) => {
    const dataUser = req.body;
    const user = new User(dataUser);
    user.save();
    res.json(user);
});

// update User
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.updateOne(
        { _id: id },
        req.body,
    );
    if(user) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// delete User
router.delete('/:id', async (req, res) => {
    const user = await User.remove({
        _id: req.params.id
    });
    if(user) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// User.pre('deleteOne', function (next) {
//     const userId = this.getQuery()["_id"];
//     mongoose.model("Thought").deleteMany({'user': userId}, function (err, result) {
//       if (err) {
//         console.log(`[error] ${err}`);
//         next(err);
//       } else {
//         console.log('success');
//         next();
//       }
//     });
// });

module.exports = router;