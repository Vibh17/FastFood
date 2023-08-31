const express = require('express')
const Order = require('../models/Orders')
const router = express.Router()


router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:myData})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});
module.exports = router