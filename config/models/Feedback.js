var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var feedbackSchema = new Schema({
        scope : { type : String, required: true },
        subject : { type : String },
        email : { type : String },
        comment : { type: String },
        satisfaction : { type: Number }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

mongoose.model('Feedback', feedbackSchema);
