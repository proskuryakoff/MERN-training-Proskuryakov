const {Router} = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/playlists');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, controller.getPlaylists);
router.delete('/:id', authMiddleware, controller.deletePlaylist)

module.exports = router;