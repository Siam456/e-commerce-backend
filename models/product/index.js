const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sku: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    unit: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    flashSale: {
      type: Boolean,
      required: false,
      default: false,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    priceRange: {
      max: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
    },

    views: {
      type: Number,
      required: false,
      default: 0,
    },
    totalSales: {
      type: Number,
      required: false,
      default: 0,
    },

    dimensions: {
      colors: [
        {
          name: {
            type: String,
            required: true,
          },
          hexCode: {
            type: String,
          },
          imageUrl: {
            type: String,
          },
        },
      ],
      sizes: [
        {
          type: String,
        },
      ],
      range: [
        {
          type: String,
        },
      ],
    },
    varieties: [
      {
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        range: {
          type: String,
        },
        price: {
          type: Number,
          default: 0,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        availability: {
          inStock: {
            type: Boolean,
            default: false,
          },
          quantity: {
            type: Number,
            default: 0,
          },
        },
      },
    ],

    // type: {
    //   type: String,
    //   required: true,
    // },

    tag: [String],

    avgRating: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
