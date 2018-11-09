const mongoose = require('mongoose');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

const update = async (req, res, next) => {
  try {
    const id = req.userId;
    const {
      name,
      username,
      password,
      confirmPassword,
    } = req.body;

    if (password && password !== confirmPassword) {
      return res.status(400).json({
        error: 'Password doesn\'t match',
      });
    }

    const user = await User.findByIdAndUpdate(id, {
      name,
      username,
    }, {
      new: true,
    });

    if (password) {
      user.password = password;
      await user.save();
    }

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const tweetCount = await Tweet.find({
      user: user.id,
    }).count();

    return res.json({
      user,
      tweetCount,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  update,
  me,
};
