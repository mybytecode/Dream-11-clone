


function get_exam_master(catid){
  $.post(SITE_URL+'/superadmin/questions/get_exam_master_by_examcategoryid',{
        catid:catid
    },function(responsedata,status){
      var response = JSON.parse(responsedata);
      if(response.status == '1')
          {
            $('#ExamMasterId').html(response.data);
          }
          else
          {   
            $('#ExamMasterId').html(response.data);
          }
    });
}

//form_add_quiz_test

$(document).ready(function (e) {
    $("#form_add_practice_test").on('submit', (function (e) {
    var validate=0;

if(validate==0){
    $('#submit').attr('disabled','disabled');
    e.preventDefault();
    $.ajax({
            url: SITE_URL+'/superadmin/practice/save_practice_test', // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {

                data = data.trim();
                  if(data) {
                    try {
                      var response = JSON.parse(data);
                    
                      if(response.status == '1')
                      {
                          //$('#submit').removeAttr('disabled');
                          alertify.alert(response.msg);
                          $('#ExamCategoryId').val('');
                          $('#ExamMasterId').val('');
                          $('#title').val('');
                          $('#Tags').val('');
                          $('#duration').val('');
                          $('#description').text('');
                          
                       }
                      else
                      {   
                          //$('#submit').removeAttr('disabled');
                          alertify.alert(response.msg);
                      }
                    } catch(e) {
                     
                       alertify.alert(e); // error in the above string (in this case, yes)!
                    }
                  }
            }
        });
} // validation ends here 

    }));
});

    
$(document).ready(function (e) {
    $("#add_new_practice").on('submit', (function (e) {

        alert('')

  var validate=0;
      if(validate==0){
      $('#submit').attr('disabled','disabled');
        e.preventDefault();
        $.ajax({
            url: SITE_URL+'/superadmin/practice/add_new_practice_questions', // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {
                data = data.trim();
                  if(data) {
                    try {
                      var response = JSON.parse(data);
                    
                      if(response.status == '1')
                      {
                        alert('hello');
                          alertify.alert(response.msg);
                          $('#ExamCategoryId').val('');
                          $('#ExamMasterId').val('');
                          $('#title').val('');
                          $('#Tags').val('');
                          $('#duration').val('');
                          $('#description').text('');
                          
                       }
                      else
                      {   
                          //$('#submit').removeAttr('disabled');
                          alertify.alert(response.msg);
                      }
                    } catch(e) {
                     

                       alertify.alert(e); // error in the above string (in this case, yes)!
                    }
                  }
            }
        });
} // validation ends here 

    }));
});

$(document).ready(function (e) {
    $("#form_add_quiz_test").on('submit', (function (e) {
    var validate=0;
if(validate==0){
    $('#submit').attr('disabled','disabled');
    e.preventDefault();
    $.ajax({
            url: SITE_URL+'/superadmin/quiz/save_quiz_test', // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {

                data = data.trim();
                  if(data) {
                    try {
                      var response = JSON.parse(data);
                    
                      if(response.status == '1')
                      {
                          //$('#submit').removeAttr('disabled');
                          alertify.alert(response.msg);
                          $('#ExamCategoryId').val('');
                          $('#ExamMasterId').val('');
                          $('#title').val('');
                          $('#Tags').val('');
                          $('#duration').val('');
                          $('#description').text('');
                          
                       }
                      else
                      {   
                          //$('#submit').removeAttr('disabled');
                          alertify.alert(response.msg);
                      }
                    } catch(e) {
                     
                       alertify.alert(e); // error in the above string (in this case, yes)!
                    }
                  }
            }
        });
} // validation ends here 

    }));
});





