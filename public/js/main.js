$(function() {
	
	$("#hbs-left-nav, #off-canvas-nav").metisMenu();

	Waves.attach('.btn, #hbs-left-nav li a');
	Waves.init();

	$('.theme-switcher li a').click(function(e) {
		e.preventDefault();
		var selected = $(this).attr('class');
		console.log(selected);
		$('body').removeClass();
		$('body').addClass(selected);
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.summernote').each(function(i, obj) { 
    $(obj).summernote({
      height: 250,
      toolbar: [
		    // [groupName, [list of button]]
		    ['style', ['bold', 'italic', 'underline', 'clear']],
		    ['font', ['strikethrough', 'superscript', 'subscript']],
		    ['fontsize', ['fontsize']],
		    ['color', ['']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['height', ['']],
		    ['misc', ['codeview','fullscreen', 'undo','redo']]
		  ],
      popover: {
        image: [],
        link: [],
        air: []
      },
      callbacks : {
        onInit : function(){},
        onBlur : function() {
          if( $(this).closest('textarea.summernote').attr('required') ) {
            $('.note-editor, .note-editable').addClass('parsley-error');
          }
        }
      }
    });
  });

});