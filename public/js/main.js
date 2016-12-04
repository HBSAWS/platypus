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


$(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

});