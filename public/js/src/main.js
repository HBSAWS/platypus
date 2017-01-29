'use strict';

;(function ($) {
	var Platypus = {
		ondomready: function ondomready() {
			Platypus.btnSubmitAnimate();
			Platypus.inputMaxLength();
			Platypus.backToTop();
			Platypus.highlightJS();
			Platypus.waveEffect();
			Platypus.breadCrumbs();
			Platypus.leftMenu();
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
			Platypus.slimScroll();
			Platypus.gallery();
			Platypus.AZList();
			Platypus.calendar();
			Platypus.rotatingBg();
			Platypus.modal();
			Platypus.search();
			Platypus.gridList();
			Platypus.externalLinks();
			Platypus.getSpinnerOpts();
			Platypus.searchPills();
			Platypus.infiniteLoading();
			Platypus.toolTip();
			Platypus.toolTip();
			Platypus.popOver();
		},
		btnSubmitAnimate: function btnSubmitAnimate() {
			Ladda.bind('button[type=submit]');
		},
		inputMaxLength: function inputMaxLength() {
			$('input[maxlength], textarea[maxlength]').maxlength({
				alwaysShow: true,
				// threshold: 10,
				warningClass: "tag tag-success",
				limitReachedClass: "tag tag-danger"
			});
		},
		backToTop: function backToTop() {
			//$('.container-fluid').append('<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="Return to the top" data-toggle="tooltip" data-placement="left"><span class="fa fa-chevron-up"></span></a>')
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
			//$('#back-to-top').tooltip('show');
		},
		highlightJS: function highlightJS() {
			$('pre code').each(function (i, e) {
				hljs.highlightBlock(e);
			});
		},
		waveEffect: function waveEffect() {
			Waves.attach('.btn, .sidebar-nav li a');
			Waves.init();
		},
		breadCrumbs: function breadCrumbs() {
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
		leftMenu: function leftMenu() {
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
		carousel: function carousel() {
			$(".carousel").slick({
				dots: true,
				infinite: false,
				arrows: false
			});
		},
		dataTables: function dataTables() {

			$.ajax('/api/student/100', {
				success: function success(data) {
					data.forEach(function (item) {
						//console.log(item);
						$('table.datatable tbody').append('\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td class="text-nowrap"><img src="' + item.photo + '" class="img-fluid"></td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.first_name + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.last_name + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.interests + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.year + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.section + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.phone + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap">' + item.email + '</td>\n\t\t\t\t\t\t\t<td class="text-nowrap"></td>\n\t\t\t\t\t\t</tr>');
					});

					$('.datatable').DataTable({
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
				},
				error: function error() {
					swal('Error', 'Cannot retrieve sample data.', 'error');
				}
			});
		},
		toolTip: function toolTip() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		popOver: function popOver() {
			$('[data-toggle="popover"]').popover();
		},
		select2: function select2() {
			$('.select2').select2({
				theme: "bootstrap",
				placeholder: 'Select a month'
			});
		},
		dateRange: function dateRange() {
			$('input[name="daterange"]').daterangepicker();
		},
		wysiwyg: function wysiwyg() {
			$('.summernote').summernote({
				height: '200px',
				airMode: false,
				shortcuts: false,
				toolbar: [
				// [groupName, [list of button]]
				['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough', 'superscript', 'subscript']], ['fontsize', ['fontsize']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['view', ['fullscreen', 'codeview']]],
				popover: {
					air: [
						// ['color', ['color']],
						// ['font', ['bold', 'underline', 'clear']]
					]
				}
			});
		},
		gauges: function gauges() {
			$(".dial").each(function () {
				$(this).knob({
					fgColor: $(this).data('color') !== '' ? $(this).data('color') : 'green'
				});
			});
		},
		wizard: function wizard() {
			
			var $wizard = $('#myWizard').wizard();
			var $form = $wizard.closest('form');

			$wizard.on('actionclicked.fu.wizard', function (evt, data) {
				console.log("wiz action clicked");
				if ( data.direction === 'next' && !$form.parsley().validate('block' + data.step) ) {
					evt.preventDefault();
					return;
				}
			});

			$wizard.on('finished.fu.wizard', function (evt, data) {
				$form.submit();
				console.log("submit");
			});


		},
		toasts: function toasts() {

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
		dateTimePickers: function dateTimePickers() {
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
		slider: function slider() {
			$('input[name="slider"]').slider({
				formatter: function formatter(value) {
					return value;
				}
			});
		},
		formRendering: function formRendering() {
			$('form small').each(function () {
				var helpText = $(this).html();
				var tooltipHelp = ' <a href="#" class="" data-toggle="tooltip" data-placement="right" title="' + helpText + '"><i class="fa fa-question-circle-o"></i></a>';
				$(this).closest('.form-group .col-md-8').find('label').append(tooltipHelp);
			});

			$('form *:input[type!=hidden]:first').focus();

			$('input,textarea,select').filter('[required]').each(function () {
				$(this).closest('.form-group').find('label').append(" <span class='float-xs-right text-danger'>*</span>");
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
		slimScroll: function slimScroll() {
			$('.sidebar').slimScroll({
				height: '100%'
			});
		},
		gallery: function gallery() {
			$('.gallery').click(function (event) {
				event = event || window.event;
				var target = event.target || event.srcElement,
				    link = target.src ? target.parentNode : target,
				    options = { index: link, event: event, hidePageScrollbars: false },
				    links = this.getElementsByTagName('a');
				blueimp.Gallery(links, options);
			});
		},
		AZList: function AZList() {
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
		calendar: function calendar() {
			
			$.ajax('/api/event/20', {
				success: function success(data) {
					
				$('.full-calendar').fullCalendar({
						header: {
							left: 'prev,next today',
							center: 'title',
							right: 'month,agendaWeek,agendaDay'
						},
						defaultDate: moment().format('YYYY-MM-DD'),
						defaultView: 'month',
						editable: true,
						events: data,
						eventClick: function eventClick(event, jsEvent, view) {
							$('#event-modal .modal-body .event-title').html(event.title);
							$('#event-modal .modal-body .event-category').html(event.category);
							$('#event-modal .modal-body .event-description').html(event.description);
							$('#event-modal .modal-body .event-starts').html(moment(event.start).format("MMM DD YYYY"));
							$('#event-modal .modal-body .event-ends').html(moment(event.end).format("MMM DD YYYY"));
							$('#event-modal .modal-body .event-location').html(event.location);
							$('#event-modal .modal-body .event-start-month').html(moment(event.start).format("MMM"));
							$('#event-modal .modal-body .event-start-day').html(moment(event.start).format("DD"));
							$('#event-modal #event-url').attr('href', event.url);
							$('#event-modal').modal();
						}
					});


					data.forEach(function (event) {
						//console.log(item);
						$('#event-listing-demo').append(`
					        <div class="row">
					            <div class="col-xs-1 event text-xs-center">
					                <div class="event-start-month tag tag-default d-block text-uppercase">${moment(event.start).format("MMM")}</div>
					                <div class="event-start-day day display-4 font-weight-bold">${moment(event.start).format("DD")}</div>
					            </div>
					            <div class="col-xs-11">
					                <h3 class="event-title font-weight-bold">${event.title}</h3> 
					                <span class="tag tag-default event-category">${event.category}</span>
					                <ul class="list-unstyled">
					                    <li><span class="event-starts">${moment(event.start).format("MMM DD YYYY")}</span> - <span class="event-ends">${moment(event.end).format("MMM DD YYYY")}</span></li>
					                    <li><i class="fa fa-map-marker"></i> <a href="#" target="_blank"><span class="event-location">${event.location}</span></a></li>
					                </ul>
					                <div class="event-description">
					                    ${event.description}
					                </div>
					            </div>
					        </div>
					        <hr>
						`);
					});

				},
				error: function error() {
					swal('Error', 'Cannot retrieve sample data.', 'error');
				}
			});

		},
		modal: function modal() {
			// global modal options 
		},
		rotatingBg: function rotatingBg() {
			$('.rotating-bg').css('background-image', 'url("/images/rotating-bg-hbs/bg-hbs-' + _.random(1, 4) + '.png")');
		},
		search: function search() {

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
					onInit: function onInit(node) {
						// console.log('Typeahead Initiated on ' + node.selector);
					},
					onClick: function onClick(node, a, item, event) {
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
		gridList: function gridList() {},
		externalLinks: function externalLinks() {
			$('a').filter(function () {
				return this.hostname && this.hostname !== location.hostname;
			}).addClass("external");
		},
		getSpinnerOpts: function getSpinnerOpts() {
			return {
				lines: 13,
				length: 0,
				width: 14,
				radius: 42,
				scale: 1,
				corners: 1,
				color: '#000',
				opacity: 0.25,
				rotate: 0,
				direction: 1,
				speed: 1,
				trail: 60,
				fps: 20,
				zIndex: 2e9,
				className: 'spinner',
				top: '50%',
				left: '50%',
				shadow: false,
				hwaccel: false,
				position: 'absolute'
			};
		},
		searchPills: function searchPills() {

			// Initialize pillBox
			$('#searchPills').pillbox({
				readonly: false,
				edit: false
			});

			// Mock functionality
			$('#facets input[type="checkbox"]').change(function (e) {
				e.preventDefault();
				var pillVal = $(this).val();

				// Show spinner
				function showSpinner() {
					var el = $('<div class="d-block mt-3 p-3">').appendTo('#results').spin(Platypus.getSpinnerOpts());
					setTimeout(function () {
						el.spin(false).remove();
					}, 1000);
				}

				if (this.checked) {
					$('#searchPills').pillbox('addItems', -1, [{ text: pillVal }]);
					showSpinner();
				} else {
					$('#searchPills').pillbox('removeByText', pillVal);
					showSpinner();
				}

				$('#searchPills').on('removed.fu.pillbox', function (evt, item) {
					$('#facets input[value="' + item.value + '"]').prop('checked', false);
					showSpinner();
				});
			});
		},
		infiniteLoading: function(){
			
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
			        console.log("You've reached the bottom of the page.");
			    }
			};

		},
		last: ''
	};

	$(document).ready(Platypus.ondomready);

	window.Platypus = Platypus;
})(jQuery);