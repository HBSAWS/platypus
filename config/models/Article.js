var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var articleSchema = new Schema({
	_category       : { type: Schema.Types.ObjectId, ref: 'Category' },
  title						: { type : String, required: true },
  slug						: { type : String, unique : true, dropDups: true, required: true },
  intro						: { type : String, },
  body						: { type: String,  required: true },
  fiddle					: { type: String },
  published				: { type: Boolean }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

mongoose.model('Article', articleSchema);