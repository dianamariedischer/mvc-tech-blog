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


// Route to get an individual blog post
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ 
        model: User,
        attributes: ['username']
      },
      { model: Comment,
        attributes: ['text', 'date_added'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      }]
    });

    const post = dbPostData.get({ plain: true });
    
    res.render('blogpost', {
      post,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn
    });
    return;
  }
  res.redirect('login');
})

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Sign up route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router;