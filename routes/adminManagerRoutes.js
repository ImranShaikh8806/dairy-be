const express = require('express');
const router = express.Router();
const {veiwOrders,updateOrders,updateStatus,cancelOrder,deleteOrder} = require('../controllers/manageOrderController');


router.get('/',veiwOrders);
router.put('/:orderId',updateOrders);
router.delete('/:orderId',deleteOrder)
router.put('/:orderId/status',updateStatus);
router.put('/:orderId/cancel',cancelOrder);

module.exports = router;