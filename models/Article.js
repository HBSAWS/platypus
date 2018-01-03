var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');

var articleSchema = new Schema({
	_category       : { type: Schema.Types.ObjectId, ref: 'Category' },
    type            : { type   : String, },
    status          : { type   : String, },
    title           : { type : String, required: true },
    slug	        : { type : String, required: true },
    intro	        : { type : String, },
    body	        : { type: String,  required: true },
    markup          : { type: String },
    best_practices  : { type: String },
    avoid           : { type: String },
    resources       : { type: String },
    js              : { type: String },
    tested_on       : { type: Array },
    fiddle	        : { type: String },
    published       : { type: Boolean },
    version         : { type: String },
    score           : { type: Number },
    accessibility   : { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

articleSchema.plugin(mongoosePaginate);


mongoose.model('Article', articleSchema);