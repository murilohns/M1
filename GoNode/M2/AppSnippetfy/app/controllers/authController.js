const bcrypt = require('bcryptjs');
const { User } = require('../models');

const signin = (req, res) => res.render('auth/signin');
const signup = (req, res) => res.render('auth/signup');

const register = async (req, res) => {
  const { email } = req.body;

  if (await User.findOne({ where: { email } })) {
    req.flash('error', 'E-mail já cadastrado');
    return res.redirect('back');
  }

  const password = await bcrypt.hash(req.body.password, 5);

  await User.create({ ...req.body, password });

  req.flash('success', 'Usuário cadastrado com sucesso');
  return res.redirect('/');
};

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('error', 'Usuário inexistente');
      return res.redirect('back');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Senha incorreta');
      return res.redirect('back');
    }

    req.session.user = user;

    return req.session.save(() => res.redirect('app/dashboard'));
  } catch (err) {
    return next(err);
  }
};

const signout = (req, res) => req.session.destroy(() => {
  res.redirect('/');
});

module.exports = {
  signin,
  signup,
  register,
  authenticate,
  signout,
};
