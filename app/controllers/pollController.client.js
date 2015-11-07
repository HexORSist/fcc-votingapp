'use strict';

(function () {

   /*var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;*/
   var displayName = document.querySelector('#display-name');
   var pollName = document.querySelector('#poll-name');
   var apiUrl = appUrl + '/api/:id';
   var apiPollModUrl = appUrl + '/api/:id/pollmod';

   function updateHtmlElement (data, element, userProperty) {
      //alert(appUrl);
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      updateHtmlElement(userObject, displayName, 'displayName');

      /*if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }*/

   }));
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiPollModUrl, function (data) {
      var userObject = JSON.parse(data);
     alert(userObject);

      //updateHtmlElement(userObject, displayName, 'displayName');

      /*if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }*/

   }));
   
   
})();
