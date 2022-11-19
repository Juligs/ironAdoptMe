const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


router.post('/edit/:user_id', (req, res) => {
  console.log('Entro aqui')
  const { username, role } = req.body
  console.log(req.body)

  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { username, role })
    .then(() => res.redirect(`/students/profile/${user_id}`))
    .catch(err => console.log(err))
})