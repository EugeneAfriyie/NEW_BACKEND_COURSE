const { model } = require("mongoose");
const Product = require("../models/Product")

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
        { $match: { category: "Electronics" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$price" },
            averagePrice: { $avg: "$price" },
            maxProductPrice: { $max: "$price" },
            minProductPrice: { $min: "$price" },
          }
        },

          {
            $project: {
                _id : 0,
                totalRevenue: 1,
                averagePrice: 1,
                maxProductPrice: 1,
                minProductPrice: 1,
                priceRange: { $subtract: ["$maxProductPrice", "$minProductPrice"] }
          }
        },
      ]);   
    res.status(200).json({
        success: true,
        data: result,
    });
  } catch (e) {
    console.error("Error in getProductAnalysis:", e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const getProductstats = async (req, res) => {
  try {

    const result = await Product.aggregate([

        // stage 1 
        {
          $match: {
          
            inStock: true,
            price: { $gte: 100 }
          },
        },

        // stage 2 : group documents
        {
            $group: {
                _id: "$category",
                totalRevenue: {
                    $sum: "$price"
                },
                averagePrice: {
                    $avg: "$price"
                },
                count: { $sum: 1 }
        }
    }
        
    ])
    res.status(200).json({
      success: true,
      data: result,
    });


    } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const insertProduct = async (req, res) => {
    try {
           const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
        success:true,
        data: `Products inserted successfully: ${result.length} products added.`
    });

        
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({
            success:false,
            message: "Internal server error"
         }
        );
    }
}


module.exports = {insertProduct, getProductAnalysis, getProductstats};