'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var User =  require('../user/user.model');

var ProductSchema = new Schema({
  title: { type: String, required: true, trim: true },
  userId : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1 },
  description: String,
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Catalog', index: true }]
}).index({
  'title': 'text',
  'description': 'text'
});

ProductSchema.index({location: '2dsphere'});



module.exports = mongoose.model('Product', ProductSchema);
