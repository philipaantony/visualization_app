const express = require('express');
const router = express.Router();
const MyData = require('../model/mydata');


router.get('', async (req, res) => {
    try {
        const maxMinIntensityByPestle = await MyData.aggregate([
            {
                $group: {
                    _id: '$pestle',
                    maxIntensity: { $max: '$intensity' },
                    minIntensity: { $min: '$intensity' },
                },
            },
        ]);

        res.json({ maxMinIntensityByPestle });
    } catch (error) {
        console.error('Error fetching max and min intensity by pestle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
