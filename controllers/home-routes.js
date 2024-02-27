const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ 
        model: User,
        attributes: ['username']
      }]
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
  });

  // Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard');
  }
  res.redirect('login');
})

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router;