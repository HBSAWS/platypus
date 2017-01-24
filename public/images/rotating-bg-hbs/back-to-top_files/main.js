;(function($){
	var Platypus = {
    	ondomready: function() {
		    Platypus.btnSubmitAnimate();
		    Platypus.inputMaxLength();
		    Platypus.highlightJS();
		    Platypus.waveEffect();
		    Platypus.breadCrumbs();
		    Platypus.leftMenu();
		    Platypus.carousel();
		    Platypus.tabs();
		    Platypus.dataTables();
		    Platypus.select2();
		    Platypus.dateRange();
		    Platypus.wysiwyg();
		    Platypus.gauges();
		    Platypus.wizard();
		    Platypus.toasts();
		    Platypus.dateTimePickers();
		    Platypus.slider();
		    Platypus.formRendering();
		    Platypus.slimScroll();
		    Platypus.gallery();
		    Platypus.AZList();
		    Platypus.calendar();
		    Platypus.rotatingBg();
		    Platypus.modal();
		    Platypus.search();
		    Platypus.gridList();
		    Platypus.toolTip();
		    Platypus.popOver();		    
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
			Waves.attach('.btn, .sidebar-nav li a');
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
				getItems: function getItems($parent) {
					return $parent.children();
				},
				getItemLink: function getItemLink($item) {
					return $item.find('a');
				},
				ellipsis: function ellipsis(classes, label) {
					return '<li class="' + classes.ellipsisClass + '">' + label + '</li>';
				},

				dropdown: function dropdown(classes) {
					var dropdownClass = 'dropdown'; // was 'dropdown'
					var dropdownMenuClass = 'dropdown-menu';

					if (this.options.overflow === 'right') {
						dropdownMenuClass += ' dropdown-menu-right';
					}

					return '<li class="' + dropdownClass + ' ' + classes.dropdownClass + '">\n\t\t\t\t      <a href="javascript:void(0);" class="' + classes.toggleClass + '" data-toggle="dropdown">\n\t\t\t\t        <i class="' + classes.toggleIconClass + '"></i>\n\t\t\t\t      </a>\n\t\t\t\t      <ul class="' + dropdownMenuClass + ' ' + classes.dropdownMenuClass + '"></ul>\n\t\t\t\t    </li>';
				},

				dropdownItem: function dropdownItem(classes, label, href) {
					if (!href) {
						return '<li class="' + classes.dropdownItemClass + ' ' + classes.dropdownItemDisableClass + '"><a href="#">' + label + '</a></li>';
					}
					return '<li class="' + classes.dropdownItemClass + '"><a href="' + href + '">' + label + '</a></li>';
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
		              "<'row'<'col-xs-11 text-xs-left'f><'col-xs-1 text-xs-right'l>>" +
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
				    ['height', ['height']],
				    ['view', ['fullscreen','codeview']],  
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
            $('input[name="slider"]').slider({
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

            $('input,textarea,select').filter('[required]').each(function(){
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
			$('.sidebar').slimScroll({
		        height: '100%'
		    });
		},
		gallery: function() {
			$('.gallery').click(function (event) {
				event = event || window.event;
				var target = event.target || event.srcElement,
				link = target.src ? target.parentNode : target,
				options = {index: link, event: event, hidePageScrollbars: false},
				links = this.getElementsByTagName('a');
				blueimp.Gallery(links, options);
			});
		},
		AZList: function() {
			$('#azList').listnav({
				initLetter: '',        // filter the list to a specific letter on init ('a'-'z', '-' [numbers 0-9], '_' [other])
			    includeAll: true,      // Include the ALL button
			    includeOther: false,    // Include a '...' option to filter non-english characters by
			    includeNums: true,     // Include a '0-9' option to filter by
			    flagDisabled: true,    // Add a class of 'ln-disabled' to nav items with no content to show
			    removeDisabled: false, // Remove those 'ln-disabled' nav items (flagDisabled must be set to true for this to function)
			    allText: 'All',        // set custom text in navbar to ALL button
			    noMatchText: 'No matching entries', // set custom text for nav items with no content to show
			    showCounts: true,      // Show the number of list items that match that letter above the mouse
			    dontCount: '',          // A comma separated list of selectors you want to exclude from the count function (numbers on top of navigation)
			    cookieName: null,      // Set this to a string to remember the last clicked navigation item requires jQuery Cookie Plugin ('myCookieName')
			    onClick: null,         // Set a function that fires when you click a nav item. see Demo 5
			    prefixes: [],          // Set an array of prefixes that should be counted for the prefix and the first word after the prefix ex: ['the', 'a', 'my']
			    filterSelector: ''     // Set the filter to a CSS selector rather than the first text letter for each item
			});
		},
		calendar: function() {
			$('.full-calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultDate: moment().format('YYYY-MM-DD'),
				defaultView: 'month',
				editable: true,
				events: [
					{
						title: 'All Day Event',
						category: 'Meetings',
						start: moment(),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',
					},
					{
						title: 'Long Event',
						category: 'Personal',						
						start: moment().add(1, 'day'),
						end: moment().add(1, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',

					},
					{
						id: 999,
						title: 'Another Event',
						category: 'Meetings',						
						start: moment().add(2, 'day'),
						end: moment().add(2, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',
					},
					{
						id: 123,
						title: 'Yet Another Event',
						category: 'Vacation',						
						start: moment().add(3, 'day'),
						end: moment().add(3, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',
					},
					{
						title: 'Meeting',
						category: 'Meetings',						
						start: moment().add(4, 'day'),
						end: moment().add(4, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',						
					},
					{
						title: 'Lunch',
						category: 'Meetings',						
						start: moment().add(5, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',						
					},
					{
						title: 'Birthday Party',
						category: 'Meetings',						
						start: moment().add(6, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',						
					},
					{
						title: 'Some Event',
						category: 'Personal',						
						url: '#',
						start: moment().add(7, 'day'),
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nulla unde, sint ipsa dolorum quas cupiditate, voluptate voluptatum laboriosam, ducimus, in praesentium nisi error repudiandae. Provident dolorem aliquam amet ut.',
						location: '1 Main St. Cambridge, MA 02141',						
					}
				],
				eventClick:  function(event, jsEvent, view) {
		            $('#event-modal .modal-body .event-title').html(event.title);
		            $('#event-modal .modal-body .event-category').html(event.category);
		            $('#event-modal .modal-body .event-description').html(event.description);
					$('#event-modal .modal-body .event-starts').html(moment(event.start).format("MMM DD YYYY"));	       
					$('#event-modal .modal-body .event-ends').html(moment(event.end).format("MMM DD YYYY"));		            
					$('#event-modal .modal-body .event-location').html(event.location);		            
					$('#event-modal .modal-body .event-start-month').html(moment(event.start).format("MMM"));		            
					$('#event-modal .modal-body .event-start-day').html(moment(event.start).format("DD"));		
		            $('#event-modal #event-url').attr('href',event.url);					            
		            $('#event-modal').modal();
		        }
			});

		},
		modal: function() {
			// global modal options 
		},
		rotatingBg: function() {
			$('.rotating-bg').css('background-image', 'url("/images/rotating-bg-hbs/bg-hbs-'+_.random(1, 4)+'.png")');
		},
		search: function() {
			
			// Works
			$.typeahead({
			    input: ".js-typeahead",
			    order: "asc",
			    display: ["title", "intro"],
			    href: "/articles/{{slug}}",
				group: {
			        template: function (item) {
			            return 'Found in ' + item._category.title;
			        }
    			},
			    source: {
			        ui_components: {
			            ajax: {
			                url: '/articles/search/ui-components',
			            },
			            template: '<div clas="row"><div class="col-xs-1 p-2 bg-info"><img src="/images/ui-components-thumbs/{{slug}}.png" class="img-fluid"></div><div class="col-xs-11"><h5>{{title}}</h5>{{intro}}</div></div>'
			        },
			        resources: {
			        	ajax: {
			        		url: '/articles/search/resources',
			        	},
			        	template: '<div clas="row"><div class="col-xs-12"><h5>{{title}}</h5>{{intro}}</div></div>'
			        }
			    },
			    emptyTemplate: "no result for {{query}}",
			    hint: true,
			    backdrop: {
			        "background-color": "#000"
			    },
			    callback: {
					onInit: function (node) {
			            // console.log('Typeahead Initiated on ' + node.selector);
			        },
					onClick: function (node, a, item, event) {
			            window.location(item.href);
					},			        
			    },
			    selector: {
			        container: "typeahead__container",
			        result: "typeahead__result",
			        list: "typeahead__list",
			        group: "typeahead__group",
			        item: "typeahead__item",
			        empty: "typeahead__empty",
			        display: "typeahead__display",
			        query: "typeahead__query",
			        filter: "typeahead__filter",
			        filterButton: "typeahead__filter-button",
			        dropdown: "typeahead__dropdown",
			        dropdownItem: "typeahead__dropdown-item",
			        button: "typeahead__button",
			        backdrop: "typeahead__backdrop",
			        hint: "typeahead__hint",
			        cancelButton: "typeahead__cancel-button"
			    },
			    debug: true
			});

		},
		gridList: function(){
			
		},
		last: ''
	}

	$(document).ready(Platypus.ondomready);
	
	window.Platypus = Platypus;

})(jQuery)