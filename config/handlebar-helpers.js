var moment = require('moment');

var register = function(Handlebars) {

  var helpers = {
    
    compare: function (lvalue, operator, rvalue, options) { 

      var operators, result;

      if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
      }

      if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
      }

      operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
      };

      if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
      }

      result = operators[operator](lvalue, rvalue);

      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }

    },

    truncate: function (text, length) {
      words = text.split(" ");
      new_text = text;
      if (words.length > length){
        new_text = "";
        for (var i = 0; i <= length; i++) {
         new_text += words[i] + " ";
       }  
       new_text = new_text.trim() + "..."          
     }
     return new_text;        
   },

   grouped_each: function (every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
      for (i = 0; i < context.length; i++) {
        if (i > 0 && i % every === 0) {
          out += options.fn(subcontext);
          subcontext = [];
        }
        subcontext.push(context[i]);
      }
      out += options.fn(subcontext);
    }
    return out;         
  },

  dateFormat: function(context, block) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  },

  contains: function( value, array, options ){
    // fallback...
    array = ( array instanceof Array ) ? array : [array];
    return (array.indexOf(value) > -1) ? options : "";
  },


  moduloIf: function(index_count, mod, eq, block) {
    if(parseInt(index_count+1)%(mod) === eq ){
      return block.fn(this);
    }
  },

  last: function () {}
};





if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers;
  }

};

// client
if (typeof window !== "undefined") {
  register(Handlebars);
}
// server
else {
  module.exports.register = register;
  module.exports.helpers = register(null);
}