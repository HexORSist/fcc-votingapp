'use strict';

(function () {

   var apiUrl = appUrl + '/api/:id/clicks';

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
      //console.log(formdata)
      ajaxFunctions.ajaxPost('POST', appUrl + '/api/:id/poll', formdata, function (data) {
         if(data.toString()=='failure')
            alert('pollname already exists');
         else
            window.location = appUrl+"/userpoll/"+data;
      });
      
   });
   
   $('#share-poll').on('click',function(){
      var pollname = $('#poll-name option:selected').val();
      //var formdata = $('form').serialize();
      //console.log(formdata)
      //alert(pollname);
      ajaxFunctions.ajaxPost('POST', appUrl + '/api/:id/sharepoll', pollname, function (data) {
         if(data.toString()=='failure')
            alert('pollname already exists');
         else
            window.location = appUrl+"/userpoll/"+data;
      });
      
   });
   
   $('#poll-name').on('change',function(){
      var pollname = this.value;
      $('form p').empty();
      ajaxFunctions.ajaxPost('POST', appUrl + '/api/:id/onpollchange', pollname, function (data) {
         var formdata = JSON.parse(data);
         formdata.catname.forEach(function(elm,idx){
               var input = document.createElement('input');
               input.type = 'text';
               input.name = 'catname';
               input.value = elm;
               $('form p').append(input, '</br>');         
         });
      });
   });
   
   $('#rem-poll').on('click',function(){
      var pollname = $('#poll-name').val();
      ajaxFunctions.ajaxPost('POST', appUrl + '/api/:id/onpollrem', pollname, function (data) {
         
      });
      location.reload();
   });
   
   $('#save-poll').on('click',function(){
      var formdata = $('form').serialize();
      formdata+='&pollname='+$('#poll-name option:selected').val();
      ajaxFunctions.ajaxPost('POST', appUrl + '/api/:id/onpollsave', formdata, function (data) {
         location.reload();
      });
   });

})();
