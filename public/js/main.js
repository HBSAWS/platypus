;(function($){
	var AWSFramework = {
    	ondomready: function() {
		    AWSFramework.btnSubmitAnimate();
		    AWSFramework.inputMaxLength();
		    AWSFramework.highlightJS();
		    AWSFramework.waveEffect();
		    AWSFramework.breadCrumbs();
		    AWSFramework.leftMenu();
		    AWSFramework.carousel();
		    AWSFramework.tabs();
		    AWSFramework.dataTables();
		    AWSFramework.select2();
		    AWSFramework.dateRange();
		    AWSFramework.wysiwyg();
		    AWSFramework.gauges();
		    AWSFramework.wizard();
		    AWSFramework.toasts();
		    AWSFramework.dateTimePickers();
		    AWSFramework.slider();
		    AWSFramework.formRendering();
		    AWSFramework.slimScroll();
		    AWSFramework.toolTip();
		    AWSFramework.popOver();		    
	  	},
		btnSubmitAnimate: function() {
			Ladda.bind( 'button[type=submit]');
		},
		inputMaxLength: function() {
			$('input[maxlength], textarea[maxlength]').maxlength({
				alwaysShow: true,
		      	// threshold: 10,
		      	warningClass: "tag tag-success",
		      	limitReachedClass: "tag tag-danger",
		      	// placement: 'top-right'
			});
		},
		highlightJS: function() {
			$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
		},
		waveEffect: function() {
			Waves.attach('.btn, #hbs-left-nav li a');
			Waves.init();
		},
		breadCrumbs: function() {
			$('.breadcrumb').asBreadcrumbs({
			  	namespace: 'breadcrumb',
			  	overflow: "left",
				responsive: true,
		 	  	ellipsisText: "&#8230;",
				ellipsisClass: null,
				hiddenClass: 'is-hidden',
		 	    dropdownClass: null,
				dropdownMenuClass: null,
				dropdownItemClass: null,
				dropdownItemDisableClass: 'disabled',
		 	  	toggleClass: 'dropdown-toggle',
				toggleIconClass: 'caret',
				getItems: function($parent) {
					return $parent.children();
				},
				getItemLink: function($item) {
					return $item.find('a');
				},
				// templates
				ellipsis: function(classes, label) {
				    return `<li class="${classes.ellipsisClass}">${label}</li>`;
				},

				dropdown: function(classes) {
				    const dropdownClass = 'dropdown';  // was 'dropdown'
				    let dropdownMenuClass = 'dropdown-menu';

				    if (this.options.overflow === 'right') {
				      dropdownMenuClass += ' dropdown-menu-right';
				    }

				    return `<li class="${dropdownClass} ${classes.dropdownClass}">
				      <a href="javascript:void(0);" class="${classes.toggleClass}" data-toggle="dropdown">
				        <i class="${classes.toggleIconClass}"></i>
				      </a>
				      <ul class="${dropdownMenuClass} ${classes.dropdownMenuClass}"></ul>
				    </li>`;
				  },

				  dropdownItem: function(classes, label, href) {
				    if(!href) {
				    	return `<li class="${classes.dropdownItemClass} ${classes.dropdownItemDisableClass}"><a href="#">${label}</a></li>`;
				    }
				    return `<li class="${classes.dropdownItemClass}"><a href="${href}">${label}</a></li>`;
				  },
				  // callbacks
				  onInit: null,
				  onReady: null
			});			
		},
		leftMenu: function() {
			$(".metismenu").metisMenu({ 
				toggle: true 
			});

			if(typeof(getCookie("activeLi")) != "undefined" && getCookie("activeLi").length > 0) {
				$('.metismenu ul a[href="' + getCookie("activeLi") + '"]').parent().addClass("active");
				$('.metismenu ul a[href="' + getCookie("activeLi") + '"]').parent().parent().addClass("in");
			}
			
			$(".metismenu ul a").click(function(a){
				removeActive();
			  	$(this).parent().addClass("active");
			    setActiveCookie(this.getAttribute("href"));
			  });

			function removeActive(){
				$(".metismenu ul li").each(function(li){
			    $(this).removeClass("active");
			  })
			}

			function setActiveCookie(active){
				  //document.cookie="activeLi="+active;
			    var d = new Date();
			    d.setTime(d.getTime() + (30*24*60*60*1000)); // expire in 30 days
			    var expires = "expires="+d.toUTCString();
			    document.cookie="activeLi="+active+"; " + expires;
			}

			function getCookie(cname) {
			    var name = cname + "=";
			    var ca = document.cookie.split(';');
			    for(var i=0; i<ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1);
			        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
			    }
			    return "";
			}


		},
		carousel: function() {
			$(".carousel").slick({
				dots: true,
				infinite: false,
				arrows: false,
			});			
		},
		tabs: function() {
			var $swipeTabsContainer = $('.swipe-tabs'),
			    $swipeTabs = $('.swipe-tab'),
			    $swipeTabsContentContainer = $('.swipe-tabs-container'),
			    currentIndex = 0,
			    activeTabClassName = 'active-tab';

			$swipeTabsContainer.on('init', function(event, slick) {
			    $swipeTabsContentContainer.removeClass('invisible');
			    $swipeTabsContainer.removeClass('invisible');

			    currentIndex = slick.getCurrent();
			    $swipeTabs.removeClass(activeTabClassName);
			    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
			});

			$swipeTabsContainer.slick({
			    //slidesToShow: 3.25,
			    slidesToShow: 3,
			    slidesToScroll: 1,
			    arrows: false,
			    infinite: false,
			    swipeToSlide: true,
			    touchThreshold: 10
			});

			$swipeTabsContentContainer.slick({
			    asNavFor: $swipeTabsContainer,
			    slidesToShow: 1,
			    slidesToScroll: 1,
			    arrows: false,
			    infinite: false,
			    swipeToSlide: true,
			    draggable: false,
			    touchThreshold: 10
			});

			$swipeTabs.on('click', function(event) {
			    // gets index of clicked tab
			    currentIndex = $(this).data('slick-index');
			    $swipeTabs.removeClass(activeTabClassName);
			    $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
			    $swipeTabsContainer.slick('slickGoTo', currentIndex);
			    $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
			});

			//initializes slick navigation tabs swipe handler
			$swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
			    currentIndex = $(this).slick('slickCurrentSlide');
			    $swipeTabs.removeClass(activeTabClassName);
			    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
			});
		},
		dataTables: function() {
		    var dataSet = [];
		    for(i=0; i<100; i++) {
		        dataSet.push({
		            first_name : faker.name.firstName(),
		            last_name  : faker.name.lastName(),
		            address    : faker.address.streetAddress(),
		            city       : faker.address.city(),
		            state      : faker.address.state(),
		            zip        : faker.address.zipCode(),
		            phone      : faker.phone.phoneNumber(),
		            email      : faker.internet.email(),
		            amount_due : faker.finance.amount(), 
		        });
		    }

		    $('.datatable').DataTable( {
		        data: dataSet,
		        columns: [
		            { "data": "first_name" },
		            { "data": "last_name" },
		            { "data": "address" },
		            { "data": "city" },
		            { "data": "state" },
		            { "data": "zip" },
		            { "data": "phone" },
		            { "data": "email" },
		            { "data": "amount_due" },
		        ],
		        responsive: {
		            details: {
		                type: 'column',
		                 target: -1
		            }
		        },
		        columnDefs: [
		          { className: 'control', orderable: false, targets:   -1 }
		        ],
		        dom:
		              "<'row'<'col-xs-6 text-xs-left'f><'col-xs-6 text-xs-right'l>>" +
		              "<'row'<'col-xs-12'tr>>" +
		              "<'row'<'col-xs-6'i><'col-xs-6'p>>",  
		        "oLanguage": {
		            sSearch: "",
		            sSearchPlaceholder: "Filter records",
		            sLengthMenu: "_MENU_",
		        }
		    });			
		},
		toolTip: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		popOver: function() {
			$('[data-toggle="popover"]').popover()
		},		
		select2: function() {
			$('.select2').select2({
				theme: "bootstrap",
				placeholder: 'Select a month'
			});
		},
		dateRange: function() {
			$('input[name="daterange"]').daterangepicker();
		},
		wysiwyg: function() {
			$('.summernote').summernote({
				height: '200px',
				airMode: false,
				shortcuts: false,
				toolbar: [
				    // [groupName, [list of button]]
				    ['style', ['bold', 'italic', 'underline', 'clear']],
				    ['font', ['strikethrough', 'superscript', 'subscript']],
				    ['fontsize', ['fontsize']],
				    ['color', ['color']],
				    ['para', ['ul', 'ol', 'paragraph']],
				    ['height', ['height']]
				],
  				popover: {
			    	air: [
			      	// ['color', ['color']],
			      	// ['font', ['bold', 'underline', 'clear']]
			    	]
			  	},
			});
		},
		gauges: function() {
			$(".dial").each(function() {
				$(this).knob({
			    	fgColor: $(this).data('color') !== '' ? $(this).data('color') : 'green' 
				});
			});
		},
		wizard: function() {
			$('#myWizard').wizard();
		},
		toasts: function() {

			toastr.options = {
			  "closeButton": true,
			  "debug": false,
			  "newestOnTop": false,
			  "progressBar": false,
			  "positionClass": "toast-bottom-full-width",
			  "preventDuplicates": false,
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}
		},
		dateTimePickers: function() {
	        var customIcons = {
	            time: "fa fa-clock-o",
	            date: "fa fa-calendar",
	            up: "fa fa-arrow-up",
	            down: "fa fa-arrow-down"            
	        }

	        $('input[type="datetime-local"]').datetimepicker({
	            locale: 'en',
	            format: 'YYYY-MM-DDTHH:mm:ss',
	            icons: customIcons
	        });

	        $('input[type="time"]').datetimepicker({
	            locale: 'en',
	            format: 'HH:mm:ss',
	            icons: customIcons
	            
	        });
		},
		slider: function() {
            $('#slider-example').slider({
                formatter: function(value) {
                    return value;
                }
            });
		},
		formRendering: function() {
            $('form small').each(function(){
                var helpText = $(this).html();
                var tooltipHelp = ' <a href="#" class="" data-toggle="tooltip" data-placement="right" title="' + helpText + '"><i class="fa fa-question-circle-o"></i></a>';
                $(this).closest('.form-group .col-md-8').find('label').append(tooltipHelp);
            });

            $('form *:input[type!=hidden]:first').focus();

            $('input,textarea,select').filter('[required]:visible').each(function(){
                $(this).closest('.form-group').find('label').append(" <span class='float-xs-right text-danger'>*</span>");
            });

		    window.Parsley.on('field:validated', function(e) {
                if (e.validationResult.constructor!==Array) {
                    this.$element.closest('.form-group').removeClass('has-danger').addClass('has-success');
                    this.$element.removeClass('form-control-danger').addClass('form-control-success');
                } else {
                    this.$element.closest('.form-group').removeClass('has-success').addClass('has-danger');
                    this.$element.removeClass('form-control-success').addClass('form-control-danger');
                }
            });
		},
		slimScroll: function() {
			$('body, .sidebar').slimScroll({
		        height: '100%'
		    });
		},
		last: ''
	}
	$(document).ready(AWSFramework.ondomready);
	window.AWSFramework = AWSFramework;
})(jQuery)