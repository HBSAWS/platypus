var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var articleSchema = new Schema({
	_category       : { type: Schema.Types.ObjectId, ref: 'Category' },
    type            : { type   : String, },
    status          : { type   : String, },
    title           : { type : String, required: true },
    slug	        : { type : String, unique : true, dropDups: true, required: true },
    intro	        : { type : String, },
    body	        : { type: String,  required: true },
    markup          : { type: String },
    best_practices  : { type: String },
    avoid           : { type: String },
    resources       : { type: String },
    js              : { type: String },
    tested_on       : { type: Array },
    fiddle	        : { type: String },
    published       : { type: Boolean }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

mongoose.model('Article', articleSchema);