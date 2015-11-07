'use strict';

(function () {

   /*var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');*/
   var apiUrl = appUrl + '/api/:id/clicks';
   var apiPollUrl = appUrl + '/api/:id/poll';

   /*function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }*/

   //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));
   
   
   $('#addcat').on('click',function(){
      var input = document.createElement('input');
      input.type = 'text';
      input.name = 'catname';
      input.placeholder = 'option ?';
      $('#cats').append(input,'</br>');
   });
   
   $('#remcat').on('click',function(){
      $('#cats br:last').remove();
      $('#cats input:last').remove();
   });
   
   $('#genpoll').on('click',function(){
      
      var formdata = $('form').serialize();
      
      ajaxFunctions.ajaxPost('POST', apiPollUrl, formdata, function (data) {
         
      });

   });

   /*addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);*/

})();
