const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    console.log(req.body);

    if (typeof req.body.dimensions === "string") {
      req.body.dimensions = JSON.parse(req.body.dimensions);
    }
    if (typeof req.body.varieties === "string") {
      req.body.varieties = JSON.parse(req.body.varieties);
    }

    //catoegory
    if (req.body.category) {
      req.body.category = JSON.parse(req.body.category);
    }

    //tags
    if (req.body.tag) {
      req.body.tag = JSON.parse(req.body.tag);
    }

    const newProduct = new Product(req.body);
    console.log(newProduct);

    await newProduct.save();
    res.status(200).send({
      message: "Product Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(req.body);
    res.status(200).send({
      message: "Product Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "Show" }).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    });

    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const productsArray = await Product.aggregate([
      {
        $match: {
          slug: req.params.slug,
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            categories: {
              $ifNull: ["$category", []],
            },
            currentId: "$_id",
          },
          pipeline: [
            {
              $facet: {
                matched: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $or: [
                              {
                                $gt: [
                                  {
                                    $size: {
                                      $setIntersection: [
                                        "$$categories",
                                        {
                                          $ifNull: ["$category", []],
                                        },
                                      ],
                                    },
                                  },
                                  0,
                                ],
                              },
                              {
                                $eq: [
                                  {
                                    $size: {
                                      $ifNull: ["$category", []],
                                    },
                                  },
                                  0,
                                ],
                              },
                            ],
                          },
                          {
                            $ne: ["$_id", "$$currentId"],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $limit: 5,
                  },
                ],
                topViewed: [
                  {
                    $sort: {
                      views: -1,
                    },
                  },
                  {
                    $limit: 5,
                  },
                ],
              },
            },
            {
              $project: {
                youMayLike: {
                  $cond: {
                    if: {
                      $gt: [
                        {
                          $size: "$matched",
                        },
                        0,
                      ],
                    },
                    then: "$matched",
                    else: "$topViewed",
                  },
                },
              },
            },
            {
              $unwind: "$youMayLike",
            },
            {
              $replaceRoot: {
                newRoot: "$youMayLike",
              },
            },
          ],
          as: "youMayLike",
        },
      },
    ]);

    let product = null;
    if (productsArray.length > 0) {
      product = productsArray[0];
    }

    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.sku = req.body.sku;
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.description = req.body.description;
      product.colors = req.body.colors;
      product.children = req.body.children;
      product.type = req.body.type;
      product.unit = req.body.unit;
      product.quantity = req.body.quantity;
      product.originalPrice = req.body.originalPrice;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.images = req.body.images;
      product.category = req.body.category;
      product.range = req.body.range;
      product.sizes = req.body.sizes;
      product.tag = req.body.tag;
      product.shortDescription = req.body.shortDescription;
      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
      });
    }
  });
};

const updateView = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.views = product.views + 1;
      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getMostViewedProduct = async (req, res) => {
  try {
    const products = await Product.find({
      status: "Show",
    })
      .sort({ views: -1 })
      .limit(5);
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).send({
      message: "All Products Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
  updateView,
  getMostViewedProduct,
  deleteAllProducts,
};
