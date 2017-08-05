 var fortunes = [
     "Conquer your fears or they will conquer you.",
     "Do not fear",
     "You will have a pleasant surprise.",
     "Whenever possible, keep it simple."
 ];

 let getFortune = function() {
     return fortunes[Math.floor(Math.random() * fortunes.length)];
 }

 exports.fortune = getFortune;