const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      // required: true,
    },
    totalProduts:{
      type:Number
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default:1
        },
        NoOfItems: {
          type: Number,
          required: true,
          default:1
        },
        // color: {
        //   type: String,
        //   required: true,
        // },
      },
    ],
  },
  { timestamps: true }
);

// Remove the pre-save hook as we'll handle userName in the controller

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;