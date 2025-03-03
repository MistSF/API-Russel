const express = require('express');
const router = express.Router();
const Catway = require("./models/catway_model")

/**
 * @route GET /
 * @desc Get all catways
 * @access Private
 */
router.get('/', async (req, res) => {
    try {
        const items = await Catway.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route GET /:id
 * @desc Get catway by ID
 * @access Private
 */
router.get('/:id', async (req, res) => {
    const catwayId = req.params.id;
    try {
        const catway = await Catway.findOne({ catwayNumber: catwayId });
        if (catway) {
            res.status(200).json(catway);
        } else {
            res.status(404).json("Aucun catway à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route POST /
 * @desc Create a new catway
 * @access Private
 */
router.post('/', async (req, res) => {
    let newCatwayNumber = 0;
    const { catwayNumber, catwayType, catwayState } = req.query;

    try {
        if (catwayNumber) {
            newCatwayNumber = catwayNumber;
        } else {
            const item = await Catway.findOne().sort({catwayNumber: -1});
            if (item) {
                newCatwayNumber = item.catwayNumber + 1;
            }
        }

        const newCatway = new Catway({
            catwayNumber: newCatwayNumber,
            catwayType: (catwayType) ? catwayType : "Short",
            catwayState: (catwayState) ? catwayState : "bon état"
        });

        await newCatway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route PUT /:id
 * @desc Update catway state by ID
 * @access Private
 */
router.put('/:id', async (req, res) => {
    const catwayId = req.params.id;
    const { catwayState } = req.body;

    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: catwayId},
            { catwayState: catwayState },
            { new: true, runValidators: true }
        );

        if (updatedCatway) {
            res.status(200).json(updatedCatway);
        } else {
            res.status(404).json("Aucun catway à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route DELETE /:id
 * @desc Delete catway by ID
 * @access Private
 */
router.delete('/:id', async (req, res) => {
    const catwayId = req.params.id;
    try {
        const result = await Catway.findByIdAndDelete(catwayId);
        if (result) {
            res.json("Le catway " + catwayId + " a été supprimé");
        } else {
            res.status(404).json("Aucun catway à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

module.exports = router;
