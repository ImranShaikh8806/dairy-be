// const DeliveryBoy = require('../models/DeliveryBoy');
// const OrderAssignment = require('../models/OrderAssignment');
// const Order = require('../models/Order');
// const mongoose = require('mongoose');
// var bcrypt = require("bcryptjs");

// // Create a new delivery boy
// const createDeliveryBoy = async (req, res) => {
//   try {
//     const { name, email, phone, password, pincodes, areas, maxOrdersPerDay } = req.body;

//     // ✅ Validate required fields
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, phone, and password are required fields"
//       });
//     }

    

//     // ✅ Check if the delivery boy already exists
//     const existingDeliveryBoy = await DeliveryBoy.findOne({ email });
//     if (existingDeliveryBoy) {
//       return res.status(400).json({ success: false, message: "Email already exists" });
//     }

   

//     // ✅ Create new delivery boy
//     const deliveryBoy = new DeliveryBoy({
//       name,
//       email,
//       phone,
//       password, // 🔥 Add hashed password
//       pincodes: pincodes || [],
//       areas: areas || [],
//       maxOrdersPerDay: maxOrdersPerDay || 20,
//       role: "DeliveryBoy"
//     });

//     await deliveryBoy.save();

//     res.status(201).json({
//       success: true,
//       message: "Delivery boy created successfully!",
//       data: deliveryBoy
//     });
//   } catch (error) {
//     console.error("Error creating delivery boy:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create delivery boy",
//       error: error.message
//     });
//   }
// };

// // Get all delivery boys
// const getAllDeliveryBoys = async (req, res) => {
//   try {
//     const deliveryBoys = await DeliveryBoy.find();
    
//     res.status(200).json({
//       success: true,
//       count: deliveryBoys.length,
//       data: deliveryBoys
//     });
//   } catch (error) {
//     console.error('Error fetching delivery boys:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch delivery boys',
//       error: error.message
//     });
//   }
// };

// // Get a single delivery boy by ID
// const getDeliveryBoyById = async (req, res) => {
//   try {
//     const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
//     if (!deliveryBoy) {
//       return res.status(404).json({
//         success: false,
//         message: 'Delivery boy not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: deliveryBoy
//     });
//   } catch (error) {
//     console.error('Error fetching delivery boy:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch delivery boy',
//       error: error.message
//     });
//   }
// };

// // Update a delivery boy
// const updateDeliveryBoy = async (req, res) => {
//   try {
//     const { name, email, phone, pincodes, areas, isAvailable, maxOrdersPerDay } = req.body;
    
//     const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
//     if (!deliveryBoy) {
//       return res.status(404).json({
//         success: false,
//         message: 'Delivery boy not found'
//       });
//     }
    
//     // Update fields if provided
//     if (name) deliveryBoy.name = name;
//     if (email) deliveryBoy.email = email;
//     if (phone) deliveryBoy.phone = phone;
//     if (pincodes) deliveryBoy.pincodes = pincodes;
//     if (areas) deliveryBoy.areas = areas;
//     if (isAvailable !== undefined) deliveryBoy.isAvailable = isAvailable;
//     if (maxOrdersPerDay) deliveryBoy.maxOrdersPerDay = maxOrdersPerDay;
    
//     await deliveryBoy.save();
    
//     res.status(200).json({
//       success: true,
//       data: deliveryBoy
//     });
//   } catch (error) {
//     console.error('Error updating delivery boy:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update delivery boy',
//       error: error.message
//     });
//   }
// };

// // Delete a delivery boy
// const deleteDeliveryBoy = async (req, res) => {
//   try {
//     const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
//     if (!deliveryBoy) {
//       return res.status(404).json({
//         success: false,
//         message: 'Delivery boy not found'
//       });
//     }
    
//     // Check if delivery boy has active orders
//     if (deliveryBoy.currentOrders && deliveryBoy.currentOrders.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot delete delivery boy with active orders'
//       });
//     }
    
//     await deliveryBoy.remove();
    
//     res.status(200).json({
//       success: true,
//       message: 'Delivery boy deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting delivery boy:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete delivery boy',
//       error: error.message
//     });
//   }
// };

// // Get all orders assigned to a delivery boy
// const getDeliveryBoyOrders = async (req, res) => {
//   try {
//     const deliveryBoyId = req.params.id;
    
//     // Find all assignments for this delivery boy
//     const assignments = await OrderAssignment.find({ 
//       deliveryBoyId 
//     }).populate({
//       path: 'orderId',
//       populate: {
//         path: 'userId',
//         select: 'name email phone'
//       }
//     });
    
//     if (!assignments) {
//       return res.status(404).json({
//         success: false,
//         message: 'No orders found for this delivery boy'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       count: assignments.length,
//       data: assignments
//     });
//   } catch (error) {
//     console.error('Error fetching delivery boy orders:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch delivery boy orders',
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   createDeliveryBoy,
//   getAllDeliveryBoys,
//   getDeliveryBoyById,
//   updateDeliveryBoy,
//   deleteDeliveryBoy,
//   getDeliveryBoyOrders
// };




const DeliveryBoy = require('../models/DeliveryBoy');
const OrderAssignment = require('../models/OrderAssignment');
const Order = require('../models/Order');
const crypto= require('crypto')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const generateRandomPassword = () => {
  return crypto.randomBytes(4).toString('hex');
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  },
  // Add these settings to improve deliverability
  tls: {
    rejectUnauthorized: false
  }
});



const createDeliveryBoy = async (req, res) => {
  try {
    const { name, email, phone, pincodes, areas, maxOrdersPerDay } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required fields"
      });
    }

    // ✅ Check if the delivery boy already exists
    const existingDeliveryBoy = await DeliveryBoy.findOne({ email });
    if (existingDeliveryBoy) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // ✅ Use hardcoded password and hash it
    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // ✅ Create new delivery boy
    const deliveryBoy = new DeliveryBoy({
      name,
      email,
      phone,
      password: hashedPassword, // ✅ Store hashed password
      pincodes: pincodes || [],
      areas: areas || [],
      maxOrdersPerDay: maxOrdersPerDay || 20,
      role: "DeliveryBoy"
    });

    await deliveryBoy.save();

    // ✅ Respond to the client (no email sending)
    res.status(201).json({
      success: true,
      message: "Delivery boy created successfully! Default password is 123456",
      data: {
        id: deliveryBoy._id,
        name: deliveryBoy.name,
        email: deliveryBoy.email,
        phone: deliveryBoy.phone,
        pincodes: deliveryBoy.pincodes,
        areas: deliveryBoy.areas,
        maxOrdersPerDay: deliveryBoy.maxOrdersPerDay,
        role: deliveryBoy.role
        // ✅ Don't return password in response
      }
    });

  } catch (error) {
    console.error("Error creating delivery boy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create delivery boy",
      error: error.message
    });
  }
};

// Get all delivery boys
const getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find();
    
    res.status(200).json({
      success: true,
      count: deliveryBoys.length,
      data: deliveryBoys
    });
  } catch (error) {
    console.error('Error fetching delivery boys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivery boys',
      error: error.message
    });
  }
};

// Get a single delivery boy by ID
const getDeliveryBoyById = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: 'Delivery boy not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: deliveryBoy
    });
  } catch (error) {
    console.error('Error fetching delivery boy:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivery boy',
      error: error.message
    });
  }
};

// Update a delivery boy
const updateDeliveryBoy = async (req, res) => {
  try {
    const { name, email, phone, pincodes, areas, isAvailable, maxOrdersPerDay } = req.body;
    
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: 'Delivery boy not found'
      });
    }
    
    // Update fields if provided
    if (name) deliveryBoy.name = name;
    if (email) deliveryBoy.email = email;
    if (phone) deliveryBoy.phone = phone;
    if (pincodes) deliveryBoy.pincodes = pincodes;
    if (areas) deliveryBoy.areas = areas;
    if (isAvailable !== undefined) deliveryBoy.isAvailable = isAvailable;
    if (maxOrdersPerDay) deliveryBoy.maxOrdersPerDay = maxOrdersPerDay;
    
    await deliveryBoy.save();
    
    res.status(200).json({
      success: true,
      data: deliveryBoy
    });
  } catch (error) {
    console.error('Error updating delivery boy:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update delivery boy',
      error: error.message
    });
  }
};

// Delete a delivery boy
const deleteDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    
    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: 'Delivery boy not found'
      });
    }
    
    // Check if delivery boy has active orders
    if (deliveryBoy.currentOrders && deliveryBoy.currentOrders.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete delivery boy with active orders'
      });
    }
    
    await deliveryBoy.remove();
    
    res.status(200).json({
      success: true,
      message: 'Delivery boy deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting delivery boy:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete delivery boy',
      error: error.message
    });
  }
};

// Get all orders assigned to a delivery boy
const getDeliveryBoyOrders = async (req, res) => {
  try {
    const deliveryBoyId = req.params.id;
    
    // Find all assignments for this delivery boy
    const assignments = await OrderAssignment.find({ 
      deliveryBoyId 
    }).populate({
      path: 'orderId',
      populate: {
        path: 'userId',
        select: 'name email phone'
      }
    });
    
    if (!assignments) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this delivery boy'
      });
    }
    
    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Error fetching delivery boy orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivery boy orders',
      error: error.message
    });
  }
};

module.exports = {
  createDeliveryBoy,
  getAllDeliveryBoys,
  getDeliveryBoyById,
  updateDeliveryBoy,
  deleteDeliveryBoy,
  getDeliveryBoyOrders
};