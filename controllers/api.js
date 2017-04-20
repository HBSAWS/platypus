var mongoose = require('mongoose'),
    _ = require('lodash'),
    faker = require('faker'),
    moment = require('moment');

module.exports = {

    resource: function(req, res, next) {
        var numRecods = req.params.num ? req.params.num : 10;
        var resource = req.params.resource;
        var data = [];

        for(var i=0; i < numRecods; i++) {

            switch(resource) {
                
                /* Generate Student */
                case 'student':
                    var fname = faker.name.firstName();
                    var lname = faker.name.lastName();
                    var currentYear = new Date().getFullYear();
                    var years = [currentYear-1, currentYear, currentYear+1];
                    var year = _.sample(years);
                    sections = ['A','B','C','D','E','F','G','H','I','J'];

                    var interests = [
                        "Agribusiness",
                        "Biomed/Pharmaceutical: Biotechnology",
                        "Biomed/Pharmaceutical: General Chemical/Pharm/Medical Prods",
                        "Biomed/Pharmaceutical: Medical/Health Care Devices",
                        "Biomed/Pharmaceutical: Pharmaceuticals",
                        "Communications: Broadcasting",
                        "Communications: Diversified",
                        "Communications: Multimedia",
                        "Communications: Other",
                        "Communications: Printing/Publishing",
                        "Consumer Products: Consumer Products",
                        "Consumer Products: Food/Beverage",
                        "Entertainment: Arts/Culture",
                        "Entertainment: Entertainment/Leisure",
                        "Entertainment: Sports",
                        "Entrepreneurship: Founding a Company",
                        "Entrepreneurship: Working for a Start-Up",
                        "Finance: Commercial Banking",
                        "Finance: Diversified/Insurance",
                        "Finance: Incubator",
                        "Finance: Investment Banking",
                        "Finance: Investment Management",
                        "Finance: Leveraged Buyout",
                        "Finance: Private Equity",
                        "Finance: Real Estate",
                        "Finance: Sales &amp; Trading",
                        "Finance: Venture Capital",
                        "Government",
                        "Highly Diversified: Manufacturing",
                        "Highly Diversified: Manufacturing &amp; Service",
                        "Highly Diversified: Service",
                        "Human Capital Management",
                        "Manufacturing: Chemicals",
                        "Manufacturing: Energy/Extractive Minerals",
                        "Manufacturing: Heavy Cap Intensive/Raw Material Suppliers",
                        "Manufacturing: Machinery &amp; Indus Equip Manufacturers",
                        "Manufacturing: Other",
                        "Manufacturing: Paper &amp; Forest Products",
                        "Manufacturing: Products/Equipment Suppliers",
                        "Manufacturing: Textiles &amp; Apparel",
                        "Military",
                        "Non-Profit: Community/Economic Development",
                        "Non-Profit: Education",
                        "Non-Profit: Foundations/Grantmaking",
                        "Non-Profit: International Development/Relief",
                        "Non-Profit: Other",
                        "Non-Profit: Religion",
                        "Real Estate: Construction",
                        "Real Estate: Development",
                        "Renewable Energy/Cleantech",
                        "Retail/Trading: General Retail/Wholesale &amp; Trading",
                        "Retail/Trading: Retailing/Wholesaling",
                        "Retail/Trading: Trading/Import/Export",
                        "Services: Accounting",
                        "Services: Advertising/Marketing",
                        "Services: Computer-related",
                        "Services: Consulting",
                        "Services: Engineering",
                        "Services: Food/Lodging",
                        "Services: Health-related",
                        "Services: Internet Development",
                        "Services: Legal",
                        "Services: Other",
                        "Services: Public Relations",
                        "Services: Social Services",
                        "Technology: Computers/Hardware",
                        "Technology: Computers/Software",
                        "Technology: Consumer Electronics",
                        "Technology: General High Technology/Electronics",
                        "Technology: Multimedia Products",
                        "Telecommunications",
                        "Transportation",
                        "Utilities",
                    ];

                    data.push({
                        //photo: faker.image.people() + '/'+ _.random(1,numRecods),
                        photo: 'http://placehold.it/300x300',
                        first_name: fname,
                        last_name: lname,
                        interests: _.sample(interests),
                        year: year,
                        section: _.sample(sections),
                        phone: '(617) 495-'+_.random(000,999),
                        email: fname.charAt(0) + lname + '@mba.'+year+'edu',
                    })                
                break;

                /* Generate Staff */
                case 'staff':
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
                    break;

                /* Generate Faculty */
                case 'faculty':
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
                        bio: faker.lorem.sentences(50),
                    })
                break;
                
                /* Generate Event */
                case 'event':

                    var singleDayEvt = _.sample([true, false]);
                    var future = _.sample([true, false]);

                    data.push({
                        image: 'https://unsplash.it/1024/576?image='+i,
                        title: faker.lorem.words(2),
                        description: faker.lorem.sentences(5),
                        category: _.sample(['Planning', 'Meetings', 'Vacation', 'Personal']),
                        start: future ? moment().add(_.random(1,7), 'day') : moment().subtract(_.random(1,7), 'day'),
                        end: null,
                        location: _.sample(['Travis 100B', 'Spangler 257', 'Batten 150']),
                        // url: _.sample([
                        //     'http://www.hbs.edu',
                        //     'http://www.hbs.edu/mba',
                        //     'http://www.hbs.edu/faculty',
                        //     'http://www.hbs.edu/doctoral',
                        //     'http://www.hbs.edu/alumni',
                        // ])
                    })
                    break;
                
                default:
                res.end("Invalid resource name.");
                return false;
            }
            
        }
        
        res.status(200).json(data);
        
    }
   
};