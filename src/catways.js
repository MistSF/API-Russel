const express = require('express');
const router = express.Router();
const Catway = require("./models/catway_model")

router.get('/catways', (req, res) => {
    Catway.find().then((item) => res.json(item))
});

router.get('/catways/:id', async (req, res) => {
    const catwayId = req.params.id
    const catway = await Catway.findById(catwayId)
    try {
        if (catway) {
            res.status(200).json(catway);
        } else {
            res.status(404).json("Aucun catway à ce numéro");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json("Erreur du serveur");
    }
});

router.post('/catways', async (req, res) => {
    let newCatwayNumber = 0
    const { catwayNumber, catwayType, catwayState } = req.query

    if (catwayNumber) {
        newCatwayNumber = catwayNumber
    } else {
        const item = await Catway.findOne().sort({catwayNumber: -1})
        if (item) {
            newCatwayNumber = item.catwayNumber + 1
        }
    }

    const newCatway = new Catway({
        catwayNumber: newCatwayNumber,
        catwayType: (catwayType) ? catwayType : "Short",
        catwayState: (catwayState) ? catwayState : "bon état"
    })

    await newCatway.save()
    res.json(newCatway)
});

router.put('/catways/:id', async (req, res) => {
    const catwayId = req.params.id
    const { catwayState } = req.body;

    try {
        const updatedCatway = await Catway.findByIdAndUpdate(
            catwayId,
            { catwayState: catwayState },
            { new: true, runValidators: true }
        );

        if (updatedCatway) {
            res.status(200).json(updatedCatway);
        } else {
            res.status(404).json("Aucun catway à ce numéro")
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Erreur du serveur")
    }
});

router.delete('/catways/:id', async (req, res) => {
    const catwayId = req.params.id;
    try {
        const result = await Catway.findByIdAndDelete(catwayId)
        console.log(result)
        if (result) {
            res.json("Le catway " + catwayId + " a été supprimé")
        } else {
            res.status(404).json("Aucun catway à ce numéro")
        }
    } catch (e) {
        console.error(e)
        res.json("Erreur de serveur")
    }
});

module.exports = router;