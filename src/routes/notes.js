const express = require('express');
const router = express.Router();

router.get('/notes', (req,res) => {
	res.send('Notes from Data Base');
});

module.exports = router;