var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var feedbackSchema = new Schema({
        appTitle : { type : String, required: true },
        scope : { type : String, required: true },
        subject : { type : String },
        email : { type : String },
        comment : { type: String },
        satisfaction : { type: Number }
    },
    { timestamps: { 
    	createdAt: 'created_at', 
    	updatedAt: 'updated_at' 
    },
    collection: 'feedback' 
});

mongoose.model('Feedback', feedbackSchema);
