var templateString = 'Hello, {{city}} {{age}}! #{{name}}'

var user1 = {id:1, name:'john', age:123, city:'kyiv'};
var user2 = {id:2, name:'alex', age:55, city:'lviv'};

var compile = function (template) {
  return function (obj) {
  
    var exclamationIndex = template.search('!');
    var exclamation = template.substr(exclamationIndex,1);
 
    var modifyTemplate = template.replace(/{{city}}/, obj.city).replace(/{{age}}!/, obj.age).replace(/#{{name}}/, obj.name)+exclamation;

    return modifyTemplate;
  };
}

var template = compile(templateString);

document.getElementById('user1').innerHTML = template(user1);
document.getElementById('user2').innerHTML = template(user2);

console.log(template(user1)); // => Hello, john!
console.log(template(user2)); // => Hello, alex!

