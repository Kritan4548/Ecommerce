const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 2,

        },
        slug: {
            type: String,
            unique: true,
        },
        summary: String,
        description: String,
        category: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Category',
                default: null
            },
        ],
        price: {
            type: Number,
            min: 1,
            required: true
        },
        discount: {
            type: Number,
            min: 0
        },
        afterDiscount: {
            type: Number,
            min: 1,
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: 'Brand',
            default:null
        },
        attributes: [{
            key: String,
            value: [String]
        }],
        tag: [String],
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        },
        seller: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: null
        },
        image: [String],
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },

    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    }
);

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;