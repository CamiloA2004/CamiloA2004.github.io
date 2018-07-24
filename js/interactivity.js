jQuery("#credits").on("click", function() {
var message = "Game created by Camilo!";
jQuery("#credits").append(
"<p>" + message + "</p>"
);
});

jQuery("#scoresbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
 "<ul>" +
 "<li>" + "Me" + "</li>" +
 "<li>" + "Also me" + "</li>" +
 "<li>" + "Me again" + "</li>" +
 "</ul>"
);
});
jQuery("#creditsbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<div>" + "Game created by Bob!" + "</div>"
);
});
jQuery("#helpbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<ul>"
+ "<li>" + "Press SPACE to flap your wings" + "</li>"
+ "<li>" + "Avoid the incoming pipes" + "</li>"
+ "</ul>"
);
});

function registerScore(){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  jQuery("#content").append(
    "<ul>" +scoreEntry+  "</ul>"
  );
}
