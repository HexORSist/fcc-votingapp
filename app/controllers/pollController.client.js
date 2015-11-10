'use strict';

(function () {

   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';
   var apiPollModUrl = appUrl + '/api/:id/pollmod';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      updateHtmlElement(userObject, displayName, 'displayName');
   }));
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiPollModUrl, function (data) {
      var userObject = JSON.parse(data);
      
      userObject.forEach(function(elm){
         var option = document.createElement('option');
         option.value = elm;
         option.innerHTML = elm;
         $('#poll-name').append(option);
      });
      
      $('#poll-name').trigger('change');
   }));
   
   
})();
