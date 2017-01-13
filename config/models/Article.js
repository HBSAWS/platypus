var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var articleSchema = new Schema({
	_category       : { type: Schema.Types.ObjectId, ref: 'Category' },
  type            : { type : String, },
  title						: { type : String, required: true },
  slug						: { type : String, unique : true, dropDups: true, required: true },
  intro						: { type : String, },
  body						: { type: String,  required: true },
  markup          : { type: String },
  js              : { type: String },
  fiddle					: { type: String },
  published				: { type: Boolean }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

mongoose.model('Article', articleSchema);