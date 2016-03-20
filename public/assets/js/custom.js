$(document).ready(function() {
  $(".modal-trigger").leanModal();
  $(".addItemDisabledBtn").click(function(){
    swal({   title: "Error!",   text: "You need to be logged in to sell an item!",   type: "error",   confirmButtonText: "Okay" });
  });
  // $(".addItemBtn").click(function(){
  //   swal({   title: "Are you sure?",   text: "You will not be able to recover this imaginary file!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){   swal("Deleted!", "Your imaginary file has been deleted.", "success"); });
  // });
});