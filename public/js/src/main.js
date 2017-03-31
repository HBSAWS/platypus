'use strict';

;(function ($) {
	var Platypus = {
		ondomready: function ondomready() {
			Platypus.setupSpinOnAjax();
			Platypus.btnSubmitAnimate();
			Platypus.inputMaxLength();
			Platypus.backToTop();
			Platypus.highlightJS();
			Platypus.waveEffect();
			Platypus.leftMenu();
			Platypus.cards();
			Platypus.carousel();
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
			Platypus.formConditionize();
			Platypus.slimScroll();
			Platypus.gallery();
			Platypus.AZList();
			Platypus.rotatingBg();
			Platypus.modal();
			Platypus.navBar();
			Platypus.search();
			Platypus.externalLinks();
			Platypus.searchPills();
			Platypus.infiniteLoading();
			Platypus.feedback();
			Platypus.renderCharts();
			Platypus.gridListSwitcher();
			Platypus.videoWidget();
			Platypus.toolTip();
			Platypus.popOver();
			Platypus.breadCrumbs();
			Platypus.hideLoader();
		},
		btnSubmitAnimate: function() {
			$('button[type="submit"]')
				.addClass('ladda-button')
				.attr('data-style', 'zoom-in')
				// .attr('data-label', 'zoom-in');

			console.log($('button[type="submit"]'));

			Ladda.bind('button[type=submit]');
		},
		inputMaxLength: function() {
			$('input[maxlength], textarea[maxlength]').maxlength({
				alwaysShow: true,
				// threshold: 10,
				warningClass: "tag tag-success",
				limitReachedClass: "tag tag-danger"
			});
		},
		backToTop: function() {
			$('body').append('<a id="back-to-top" href="#" class="btn palette-bg-teal-500 btn-lg back-to-top text-white" role="button" title="Return to the top" data-toggle="tooltip" data-placement="left"><span class="fa fa-chevron-up"></span></a>');
			$(window).scroll(function () {
				if ($(this).scrollTop() > 50) {
					$('#back-to-top').fadeIn();
				} else {
					$('#back-to-top').fadeOut();
				}
			});
			$('#back-to-top').click(function () {
				$('#back-to-top').tooltip('hide');
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		},
		highlightJS: function() {
			$('pre code').each(function (i, e) {
				hljs.highlightBlock(e);
			});
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
				getItems: function($parent) {
					return $parent.children();
				},
				getItemLink: function($item) {
					return $item.find('a');
				},
				ellipsis: function(classes, label) {
					return '<li class="' + classes.ellipsisClass + '">' + label + '</li>';
				},

				dropdown: function(classes) {
					var dropdownClass = 'dropdown'; // was 'dropdown'
					var dropdownMenuClass = 'dropdown-menu';

					if (this.options.overflow === 'right') {
						dropdownMenuClass += ' dropdown-menu-right';
					}

					return '<li class="' + dropdownClass + ' ' + classes.dropdownClass + '">\n\t\t\t\t      <a href="javascript:void(0);" class="' + classes.toggleClass + '" data-toggle="dropdown">\n\t\t\t\t        <i class="' + classes.toggleIconClass + '"></i>\n\t\t\t\t      </a>\n\t\t\t\t      <ul class="' + dropdownMenuClass + ' ' + classes.dropdownMenuClass + '"></ul>\n\t\t\t\t    </li>';
				},

				dropdownItem: function(classes, label, href) {
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
		cards: function() {
			$('.card-flip').flip({
				axis: "y",
		      	reverse: false,
		      	trigger: "manual",
		      	speed: 500,
		      	forceHeight: true,
		      	forceWidth: false,
		      	autoSize: true,
		      	front: '.front',
		      	back: '.back'
			});

			$(".card-flip .btn-flip").on('click', function(e){
				e.preventDefault();
				$(this).closest('.card').flip(true);
			});

			$(".card-flip .btn-unflip").on('click', function(e){
				e.preventDefault();
				$(this).closest('.card').flip(false);
			});

		},
		leftMenu: function() {
			$(".metismenu").metisMenu({
				toggle: true
			});

			if (typeof getCookie("activeLi") != "undefined" && getCookie("activeLi").length > 0) {
				$('.metismenu ul a[href="' + getCookie("activeLi") + '"]').parent().addClass("active");
				$('.metismenu ul a[href="' + getCookie("activeLi") + '"]').parent().parent().addClass("in");
			}

			$(".metismenu ul a").click(function (a) {
				removeActive();
				$(this).parent().addClass("active");
				setActiveCookie(this.getAttribute("href"));
			});

			function removeActive() {
				$(".metismenu ul li").each(function (li) {
					$(this).removeClass("active");
				});
			}

			function setActiveCookie(active) {
				//document.cookie="activeLi="+active;
				var d = new Date();
				d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000); // expire in 30 days
				var expires = "expires=" + d.toUTCString();
				document.cookie = "activeLi=" + active + "; " + expires;
			}

			function getCookie(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
				}
				return "";
			}
		},
		carousel: function() {
			$(".carousel").slick({
				dots: true,
				infinite: false,
				arrows: false
			});
		},
		dataTables: function() {
			// Global settings for all datatables
			$.extend( true, $.fn.dataTable.defaults, {
				responsive: {
					details: {
						type: 'column',
						target: -1
					}
				},
				columnDefs: [{ className: 'control', orderable: false, targets: -1 }],
				dom: "<'row'<'col-xs-11 text-xs-left'f><'col-xs-1 text-xs-right'l>>" + "<'row'<'col-xs-12'tr>>" + "<'row'<'col-xs-6'i><'col-xs-6'p>>",
				"oLanguage": {
					sSearch: "",
					sSearchPlaceholder: "Filter records",
					sLengthMenu: "_MENU_"
				}
			});



			if( $('.datatable').length > 0 ) {

				let src = $('.datatable').data('src');
				let cols = $('.datatable').data('cols').split(',');

				console.log(src);
				console.log(cols);

				$.ajax(src, {
					success: function success(data) {

						// Destroy empty datatables generated by main.js
						if ( $.fn.DataTable.isDataTable('.datatable') ) {
						  $('.datatable').DataTable().destroy();
						}

						// get fake data
						data.forEach(function (item) {
							//console.log(item);
							$('table.datatable tbody').append("<tr></tr>");

							cols.forEach(function(col){
								$('table.datatable tbody tr:last-child').append("<td>" + item[col] +"</td>");
							})
							
							$('table.datatable tbody tr:last-child').append("<td></td>");									
								
							
						});

						// reinitialize it using demo data
						$('.datatable').DataTable();
						
					},
					error: function error() {
						swal('Error', 'Cannot retrieve sample data.', 'error');
					}
				});

			}


			$('.datatable').DataTable();
			
		},
		toolTip: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		popOver: function() {
			$('[data-toggle="popover"]').popover();
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
					['fontsize', ['fontsize']], ['color', ['color']], 
					['para', ['ul', 'ol', 'paragraph']], 
					['height', ['height']], 
					['insert', ['link']],
					['view', ['fullscreen', 'codeview']]
				],
				popover: {
					air: [
						// ['color', ['color']],
						// ['font', ['bold', 'underline', 'clear']]
					]
				}
			});


			$('.summernote-airmode').summernote({
				airMode: true,
				popover: {
		         	image: [],
		         	link: [],
		         	air: []
		       	},
				callbacks: {
					onInit: function() {
				      console.log('summernote onInit callback fired');
				    },
					onFocus: function(){
						console.log('summernote OnFocus callback fired');
						$('.note-air-popover').show();
					},
					onBlur: function(){
						console.log('summernote onBlur callback fired');
						$('.note-air-popover').hide();
					},
					onChange: function(contents, $editable) {
				      	console.log('summernote onChange callback fired:', contents, $editable);
				    }
				}
			});

		},
		gauges: function() {
			$(".dial").each(function () {
				$(this).knob({
					fgColor: $(this).data('color') !== '' ? $(this).data('color') : 'green'
				});
			});
		},
		wizard: function() {
			$('.wizard').each(function() {
				var $wizard = $(this);
				$wizard.wizard();
				var $form = $wizard.closest('form[data-parsley-validate]');

				if($form.length) {
					$wizard.on('actionclicked.fu.wizard', function (evt, data) {
						if ( data.direction === 'next' && !$form.parsley().validate({group: 'block'+data.step}) ) {
							evt.preventDefault();
							return;
						}
					});

					$wizard.on('finished.fu.wizard', function (evt, data) {
						$form.submit();
						console.log("submit");
					});
				}
			});


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
			};
		},
		dateTimePickers: function() {
			var customIcons = {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			};

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
				formatter: function formatter(value) {
					return value;
				}
			});
		},
		formRendering: function() {
			$('form small').each(function () {
				var helpText = $(this).html();
				var tooltipHelp = ' <a href="#" class="" data-toggle="tooltip" data-placement="right" title="' + helpText + '"><i class="fa fa-question-circle-o"></i></a>';
				$(this).closest('.form-group .col-md-8').find('label').append(tooltipHelp);
			});

			$('form *:input[type!=hidden]:first').focus();

			$('input,textarea,select').filter('[required]').each(function () {
				$(this).closest('.form-group').find('label').eq(0).append(" <span class='float-xs-right text-danger'>*</span>");
			});

			$('input[type="password"].meter').strength({
			    wrapper: true,
			    showHideButtonText: 'Show',
			    showHideButtonTextToggle: 'Hide'
			});


			$('form .confirm-delete').click(function(e) {
			    e.preventDefault();
			    var el = $(this);

			    swal({
				  	title: 'Are you sure?',
				  	text: "You won't be able to revert this!",
				  	type: 'warning',
				  	showCancelButton: true,
				  	// confirmButtonColor: '#3085d6',
				  	// cancelButtonColor: '#d33',
				  	confirmButtonText: 'Delete'
				}).then(function () {
				  	$(el).closest('form').submit();
				  	Ladda.stopAll();
				  	swal(
				    	'Deleted!',
				    	'Your file has been deleted.',
				    	'success'
				  	);
				}, function(dismiss){
					console.log("dismissed");
					Ladda.stopAll();
				})
			  });


			window.Parsley.on('field:validated', function (e) {
				if (e.validationResult.constructor !== Array) {
					this.$element.closest('.form-group').removeClass('has-danger').addClass('has-success');
					this.$element.removeClass('form-control-danger').addClass('form-control-success');
				} else {
					this.$element.closest('.form-group').removeClass('has-success').addClass('has-danger');
					this.$element.removeClass('form-control-success').addClass('form-control-danger');
				}
			});
		},
		formConditionize : function(options){ 
    
 			$('.conditional').conditionize();

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
				    options = { index: link, event: event, hidePageScrollbars: false },
				    links = this.getElementsByTagName('a');
				blueimp.Gallery(links, options);
			});
		},
		AZList: function() {
			$('#azList').listnav({
				initLetter: '', // filter the list to a specific letter on init ('a'-'z', '-' [numbers 0-9], '_' [other])
				includeAll: true, // Include the ALL button
				includeOther: false, // Include a '...' option to filter non-english characters by
				includeNums: true, // Include a '0-9' option to filter by
				flagDisabled: true, // Add a class of 'ln-disabled' to nav items with no content to show
				removeDisabled: false, // Remove those 'ln-disabled' nav items (flagDisabled must be set to true for this to function)
				allText: 'All', // set custom text in navbar to ALL button
				noMatchText: 'No matching entries', // set custom text for nav items with no content to show
				showCounts: true, // Show the number of list items that match that letter above the mouse
				dontCount: '', // A comma separated list of selectors you want to exclude from the count function (numbers on top of navigation)
				cookieName: null, // Set this to a string to remember the last clicked navigation item requires jQuery Cookie Plugin ('myCookieName')
				onClick: null, // Set a function that fires when you click a nav item. see Demo 5
				prefixes: [], // Set an array of prefixes that should be counted for the prefix and the first word after the prefix ex: ['the', 'a', 'my']
				filterSelector: '' // Set the filter to a CSS selector rather than the first text letter for each item
			});
		},
		navBar: function(){
			$(document).on('click', '.hamburger, .canvas-slid', function(e) {
			    $(".hamburger").toggleClass("is-active");
		  	});
		},
		modal: function() {

			$(document).on('click', '.modal-remote', function(e){
				e.preventDefault();
				
				var $bttn = $(this);
				var opts = {
					title: $bttn.data('modal-title') !== '' ? $bttn.data('modal-title') : '',
					size: $bttn.data('modal-size') !== '' ? $bttn.data('modal-size') : 'md',
					header: $bttn.data('modal-header') !== '' ? $bttn.data('modal-header') : true,
					footer: $bttn.data('modal-footer') !== '' ?  $bttn.data('modal-footer')  : true,
				}
				var modalID = 'modal-'+Math.random().toString(36).substring(7);
				
				$bttn.attr('data-target', '#modal-'+modalID);
				
				// Repurpose universal modal
				$('#universal-modal').attr('id', modalID);
				
				$(document).on('show.bs.modal', ('#'+modalID), function(e) {  
					if(opts.title) $('#'+modalID).find('.modal-title').html( opts.title );
					if(opts.size) $('#'+modalID).find('.modal-dialog').addClass('modal-'+opts.size );
					if(!opts.header) $('#'+modalID).find('.modal-header').hide();
					if(!opts.footer) $('#'+modalID).find('.modal-footer').hide();
					$('#'+modalID).find('.modal-body').load( $bttn.attr('href'), function(){
						console.log("Loading async data into modal");
					})
				});

				$(document).on('shown.bs.modal', ('#'+modalID), function(e) {  
					window.Platypus.wizard();
				});

				// Display modal
				$('#'+modalID).modal('show');

				// Reset used modal to defaults
				$(document).on('hidden.bs.modal', ('#'+modalID), function(e) { 
					$('#'+modalID).attr('id', 'universal-modal');
					$('#universal-modal').find('.modal-dialog').removeClass('modal-'+opts.size);
					$('#universal-modal').find('.modal-title').html('');
					$('#universal-modal').find('.modal-header, .modal-footer').show();
				});
			});


		},
		rotatingBg: function() {
			$('.rotating-bg').css('background-image', 'url("/images/rotating-bg-hbs/bg-hbs-' + _.random(1, 4) + '.png")');
		},
		search: function() {

			$.typeahead({
				input: ".js-typeahead",
				order: "asc",
				display: ["title", "intro"],
				href: "/articles/{{slug}}",
				group: {
					template: function template(item) {
						return 'Found in ' + item._category.title;
					}
				},
				source: {
					ui_components: {
						ajax: {
							url: '/articles/search/ui-components'
						},
						template: '<div clas="row"><div class="col-xs-1 p-2 bg-info"><img src="/images/ui-components-thumbs/{{slug}}.png" class="img-fluid"></div><div class="col-xs-11"><h5>{{title}}</h5>{{intro}}</div></div>'
					},
					resources: {
						ajax: {
							url: '/articles/search/resources'
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
					onInit: function(node) {
						// console.log('Typeahead Initiated on ' + node.selector);
					},
					onClick: function(node, a, item, event) {
						window.location(item.href);
					}
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
		externalLinks: function() {
			$('a').filter(function () {
				return this.hostname && this.hostname !== location.hostname;
			}).addClass("external").attr('target','_blank');
		},
		setupSpinOnAjax: function() {

			// setup spinner animation options
            $.fn.spin = function(opts) {
                this.each(function() {
                    var $this = $(this),
                        spinner = $this.data('spinner');
                    if (spinner) spinner.stop();
                    if (opts !== false) {
                      opts = $.extend({color: $this.css('color')}, opts);
                      spinner = new Spinner(opts).spin(this);
                      $this.data('spinner', spinner);
                    }
                });
                return this;
            };

            // bind spinner to ajax doc events
            $(document).on({
                ajaxStart: function(e) {

                	if($(e.target).is(".modal-remote")) return;

                    var el = $('<div class="spinner">').appendTo('body').spin();
                    $('body').append('<div class="overlay"></div>');
                    $(".overlay").fadeIn().append(el);
                    var opts = {
                      lines: 12, 
                      length: 5, 
                      width: 5, 
                      radius: 10, 
                      color: '#000', 
                      speed: 1, 
                      trail: 66, 
                      shadow: false 
                    };
                    $(el).spin(opts);
                },
                ajaxStop: function() { 
                    var el = $('.spinner');
                    //el.spin(false).remove();
                    $(".overlay").fadeOut();
                }   
            });

		},
		searchPills: function() {

			// Initialize pillBox
			$('#searchPills').pillbox({
				readonly: false,
				edit: false
			});

			// Mock functionality
			$('#facets input[type="checkbox"]').change(function (e) {
				e.preventDefault();
				var pillVal = $(this).val();

				// // Show spinner
				// function showSpinner() {
				// 	var el = $('<div class="d-block mt-3 p-3">').appendTo('#results').spin(Platypus.getSpinnerOpts());
				// 	setTimeout(function () {
				// 		el.spin(false).remove();
				// 	}, 1000);
				// }

				if (this.checked) {
					$('#searchPills').pillbox('addItems', -1, [{ text: pillVal }]);
					//showSpinner();
				} else {
					$('#searchPills').pillbox('removeByText', pillVal);
					//showSpinner();
				}

				$('#searchPills').on('removed.fu.pillbox', function (evt, item) {
					$('#facets input[value="' + item.value + '"]').prop('checked', false);
					//showSpinner();
				});
			});
		},
		infiniteLoading: function(){
			
			if ( $('.loadmore').length > 0 ) {
				$('.loadmore').click(function(e){
					e.preventDefault();

					var page = parseInt($(this).data('page'));
					var pages = parseInt($(this).data('pages'));
					var nextPageUrl = 'loadmore/'+ (page+1);
					$(this).data('page', page+1);
					$(this).attr('data-page', page+1);

					$.ajax(nextPageUrl, {
						success: function success(data) {

					    	data.docs.forEach(function(item, index){

					    		if(index === 0 || index % 4 === 0) {
					    			$('#component-container').append(`<div class="card-deck"></div>`)
					    		}

								$('#component-container .card-deck:last-child').append(`			    		
					    			<div class="card">
					    				<a href="/articles/${item.slug}">
										  	<div class="palette-bg-teal-100 p-2">
										  		<img class="card-img-top img-fluid" src="/images/ui-components-thumbs/${item.slug}.png" alt="Card image cap">
										  	</div>
										  	<div class="card-block">
										    	<h4 class="card-title">${item.title}</h4>
										    	<p class="card-text">${item.intro}</p>
										    	
										  	</div>
									    </a>
									</div>
					    		`);
					    	});
				    
				    		$('html, body').animate({scrollTop:$(document).height()}, 'slow');

						},
						error: function error() {
							swal('Error', 'Cannot retrieve sample data.', 'error');
						}
					});

					if( page === pages-1 ) {
						$(this).hide();
						// toastr.success('That\'s the end.');
					}
				});


				window.onscroll = function(ev) {
				    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				        // console.log("end of page");
				    }
				};
			}

		},

		feedback: function(){
			
			// Inserts feedback button in DOM
			$('body').append(`
				<a id="btn-feedback" href="/feedback/new" class="btn btn-info modal-remote"
				  	data-modal-title="Feedback"
				  	data-modal-size="lg"
				  	data-modal-header="true"
				  	data-modal-footer="false">
				  		<i class="fa fa-comment-o" data-toggle="tooltip" data-placement="left" title="Feedback"></i>
				</a>
			`);

			$(document).on('submit', '#feedbackForm', function(e){
				e.preventDefault();
				$('.modal').modal('hide');

				$.ajax({   
				   type: 'POST',   
				   url: $(this).attr('action'),   
				   data: $(this).serialize(),
				   success: function(){
					   	swal({
							title: 'Thank you',
							html: `Your feedback was submitted successfully`,
							type: 'success'
						});
				   }
				});
				
			});
			

		},

		renderCharts: function() {

			$('.chart').each(function() {

				let type = $(this).data('type');
				let target = '#'+$(this).attr('id');

				console.log(target);
				
				switch( type ) {
					case 'line':
						var chart = c3.generate({
						    bindto: target,
						    data: {
						      columns: [
						        	['data1', 30, 200, 100, 400, 150, 250],
						        	['data2', 50, 20, 10, 40, 15, 25]
						      	],
						        colors: {
						            data1: '#455A64',
						            data2: '#009688',
						            data3: '#9E9E9E'
						        },
						        color: function (color, d) {
						            return color;
						        },						      
						    }
						});
						break;
					case 'gauge':
						var chart = c3.generate({
					    data: {
					        columns: [
					            ['data', $(this).data('gauge-value') ? $(this).data('gauge-value') : '0']
					        ],
					        type: 'gauge',
					        onclick: function (d, i) { console.log("onclick", d, i); },
					        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
					        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
					    },
					    bindto: target,
					    gauge: {},
					    color: {
					        pattern: ['#009688', '#009688', '#009688', '#009688'],
					        threshold: {
					            values: [30, 60, 90, 100]
					        }
					    },
					    size: {
					        height: 180
					    }
					});
						break;
					case 'pie': 

						var chart = c3.generate({
						    data: {
						        columns: [
						            ['data1', 30],
						            ['data2', 120],
						        ],
						        type : 'donut',
						        colors: {
						            data1: '#455A64',
						            data2: '#009688',
						            data3: '#9E9E9E'
						        },
						        color: function (color, d) {
						            return color;
						        },
						        onclick: function (d, i) { console.log("onclick", d, i); },
						        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
						        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
						    },
						    bindto: target,
						    donut: {
						        title: "Example"
						    }
						});

						break;
					case 'bar':

						var chart = c3.generate({
						    data: {
						        columns: [
						            ['data1', 30, 20, 50, 40, 60, 50],
						            ['data2', 200, 130, 90, 240, 130, 220],
						            ['data3', 300, 200, 160, 400, 250, 250]
						        ],
						        type: 'bar',
						        colors: {
						            data1: '#455A64',
						            data2: '#009688',
						            data3: '#9E9E9E'
						        },
						        color: function (color, d) {
						            return color;
						        },
						    },
						    bar: {
						        width: {
						            ratio: 0.5 
						        }
						    },
						    bindto: target,
						});


						break;
					case 'spline':
						
						var chart = c3.generate({
						    data: {
						        columns: [
						            ['data1', 30, 200, 100, 400, 150, 250],
						            ['data2', 130, 100, 140, 200, 150, 50]
						        ],
						        type: 'spline',
						        colors: {
						            data1: '#455A64',
						            data2: '#009688',
						            data3: '#9E9E9E'
						        },
						        color: function (color, d) {
						            return color;
						        }						        
						    },
						    bindto: target,
						});

						break;

					case 'scatter':

						var colors = ['#455A64','#009688','#9E9E9E','#00838F'];

						var chart = c3.generate({
						    data: {
						        xs: {
						            setosa: 'setosa_x',
						            versicolor: 'versicolor_x',
						        },
						        // iris data from R
						        columns: [
						            ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
						            ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
						            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
						            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
						        ],
						        type: 'scatter',
						        color:function(color, data){            
							        return colors[data.index % colors.length];
							    },
						    },
						    axis: {
						        x: {
						            label: 'X',
						            tick: {
						                fit: false
						            }
						        },
						        y: {
						            label: 'Y'
						        }
						    },
						    point: {
							    r: 5,
							},
						    bindto: target,
						});



						break;
					default: 

				}

			})

		},
		gridListSwitcher: function(){

			var currentClasses = $('.item').eq(0).attr('class');

			$(document).ready(function() {
			    $('#btn-list').click(function(e){
			    	e.preventDefault();
			    	$('.item').removeClass().addClass('item col-xs-12');
			    	$(this).siblings().removeClass('active');
			    	$(this).addClass('active');
			    });
			    $('#btn-grid').click(function(e){
			    	e.preventDefault();
			    	$('.item').removeClass().addClass(currentClasses);
    		    	$(this).siblings().removeClass('active');
			    	$(this).addClass('active');
			    });

			});

		},

		videoWidget: function() {
			
			let trigger = $("body").find('.video-modal[data-toggle="modal"]');
	      	
	      	trigger.each(function(){

				let theModal = $(this).data("target"),
			        videoSRC = $(this).attr("data-youtube-video-id"),
			        autoplay = $(this).attr("data-autoplay") || 1,
			        videoSRCauto = `http://www.youtube.com/embed/${videoSRC}?autoplay=${autoplay}`;

	      		$(this).append(`<img class="img-fluid" src="https://img.youtube.com/vi/${videoSRC}/maxresdefault.jpg">`);

		      	$(this).click(function (e) {
  		     		e.preventDefault();
			    	$(theModal + ' iframe').attr('src', videoSRCauto);
			    	$(theModal + ' button.close').click(function () {
			    		$(theModal + ' iframe').attr('src', videoSRC);
			    	});
			    });

	      	});
		},
		hideLoader: function() {
			$('.load-container').fadeOut('slow');
			$('.load-container ~ .container-fluid').fadeIn();
			$(window).trigger('resize');
		},
		last: ''
	};

	$(document).ready(Platypus.ondomready);

	window.Platypus = Platypus;

})(jQuery);