const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Add an edit route to projectroutes.js
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.render('edit-project', {
      layout: 'main',
      project: projectData.get({ plain: true }),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to handle the form submission for editing a recipe
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { dish, cooking_time, ingredients, instructions, picture_link } = req.body;

    const projectData = await Project.update(
      { dish, cooking_time, ingredients, instructions, picture_link },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!projectData[0]) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
