var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var categorySchema = new Schema({
	_parent		    : { type: Schema.Types.ObjectId, ref: 'Category' },
  	title			: { type : String, required: true },
  	slug			: { type : String, unique : true, dropDups: true, required: true },
  	icon			: { type : String },
  	published	: { type: Boolean }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

mongoose.model('Category', categorySchema);