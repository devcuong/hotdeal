 /*gettimeago*/
 var nodes = document.querySelectorAll('.needs_to_be_rendered');

 // use render method to render nodes in real time
 timeago.render(nodes, 'vi');

 // cancel all real-time render task
 timeago.cancel();

 var numberNodes = document.querySelectorAll('.needs_to_format');


 // Format nodes number wit dots
 for (i = 0; i < numberNodes.length; i++) {
     numberNodes[i].innerHTML = numberNodes[i].innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 }
 /*endgettimeago*/