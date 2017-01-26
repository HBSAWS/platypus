var mongoose = require('mongoose'),
    _ = require('lodash'),
    faker = require('faker');

module.exports = {

    staff: function(req, res, next) {
        var numRecods = req.params.num ? req.params.num : 10;
        var data = [];

        for(var i=0; i < numRecods; i++) {

            var fname = faker.name.firstName();
            var lname = faker.name.lastName();
            var dpts = [
                "Business & Environment Initiative",
                "Dean's Office",
                "Doctoral Programs",
                "Executive Education",
                "External Relations",
                "Financial",
                "Global Initiative",
                "Healthcare Initiative",
                "Human Resources",
                "Institute for Strategy & Competitiveness",
                "Information Technology Group",
                "Knowledge & Library Services",
                "Leadership Initiative",
                "Marketing & Communications",
                "MBA Program",
                "Social Enterprise Initiative",
            ];

            data.push({
                //photo: faker.image.people() + '/'+ _.random(1,numRecods),
                photo: 'http://placehold.it/300x300',
                first_name: fname,
                last_name: lname,
                title: faker.name.title(),
                department: _.sample(dpts),
                phone: '(617) 495-'+_.random(000,999),
                email: fname.charAt(0) + lname + '@hbs.edu',
            })
        }
        
        res.status(200).json(data);
        
    },

   
};