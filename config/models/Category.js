var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var categorySchema = new Schema({
	_parent		    : { type: Schema.Types.ObjectId, ref: 'Category' },
  	title			: { type : String, required: true },
  	slug			: { type : String },
  	icon			: { type : String },
    order           : { type: Number },
  	published	: { type: Boolean }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});



categorySchema.statics.findRecursive = function(cb) {
	this.find({})
    .lean()
    .exec(function(err, items) {
        if (err) cb(err);

        var o = {},
            arr = [];
        items.forEach(function(item) {
            item.sub = [];
            o[item._id] = item;
        });
        for (var i in o) {
            var item = o[i];
            if (item._parent) {
                o[item._parent].sub.push(item);
                delete o[i];
            }
        }
        for (var i in o) {
            arr.push(o[i]);
        }
        cb(null, arr);
    });
};




mongoose.model('Category', categorySchema);