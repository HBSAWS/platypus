'use strict';

;(function ($) {

  	var load = (function() {
        function _load(tag) {
            return function(url) {
                return new Promise(function(resolve, reject) {
                    var element = document.createElement(tag);
                    var parent = 'body';
                    var attr = 'src';

                    element.onload = function() {
                      console.log("Loaded "+url+ " successfully.");
                      resolve(url);
                    };
                    element.onerror = function() {
                      console.log("Cannot load "+url);
                      reject(url);
                    };

                    switch(tag) {
                      case 'script':
                        element.async = true;
                        break;
                      case 'link':
                        element.type = 'text/css';
                        element.rel = 'stylesheet';
                        attr = 'href';
                        parent = 'head';
                    }

                    element[attr] = url;
                    document[parent].appendChild(element);
                });
            };
        }
        return {
            css: _load('link'),
            js: _load('script'),
            img: _load('img')
        }
    })();

    var currentVersion = '0.4';

	var Platypus = {
		ondomready: function() {
			Platypus.detectBreakpoint();
			Platypus.detectBrowsers();
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
			Platypus.formAddress();
			Platypus.slimScroll();
			Platypus.gallery();
			Platypus.AZList();
			Platypus.rotatingBg();
			Platypus.inlineEdit();
			Platypus.modal();
			Platypus.navBar();
			Platypus.search();
			Platypus.externalLinks();
			Platypus.searchPills();
			Platypus.infiniteLoading();
			Platypus.feedback();
			Platypus.gridListSwitcher();
			Platypus.videoWidget();
			Platypus.helpful();
			Platypus.toolTip();
			Platypus.popOver();
			Platypus.progressBar();
			Platypus.googleMaps();
			Platypus.hideLoader();
			Platypus.breadCrumbs();
			Platypus.renderCharts(); 
		},
		
		detectBreakpoint: function() {

		   	let $html = $('html'),
	       		currClass = '',
	       		finalClass = 'xl',
	       		w = $(window).width();

	       	// get current breakpoint class
			if ($html.hasClass('xl')) { currClass = 'xl'; } 
			else if ($html.hasClass('lg')) { currClass = 'lg'; } 
			else if ($html.hasClass('md')) { currClass = 'md'; } 
			else if ($html.hasClass('sm')) { currClass = 'sm'; } 
			else if ($html.hasClass('xs')) { currClass = 'xs'; }				
			
			// detect breakpoint
			if (w < 576) { finalClass = 'xs'; } 
			else if (w < 768) { finalClass = 'sm'; } 
			else if (w < 992) { finalClass = 'md'; } 
			else if (w < 1200) { finalClass = 'lg'; } 
			else { finalClass = 'xl'; } 

			if (currClass == finalClass) return;

			$html.removeClass('xl lg md sm xs');

			if (finalClass == 'xl') { $html.removeClass('lg md sm xs'); } 
			else if (finalClass == 'lg') { $html.removeClass('xl md sm xs'); } 
			else if (finalClass == 'md') { $html.removeClass('xl lg sm xs'); } 
			else if (finalClass == 'sm') { $html.removeClass('xl lg md xs'); }
			
			if (!$html.hasClass(finalClass)) {
				$html.addClass(finalClass);
			}

			$(window).resize(Platypus.detectBreakpoint);

			// console.log("Current break point is: "+finalClass);

		},
		detectBrowsers: function(){
			// Opera 8.0+
		    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    // Firefox 1.0+
		    var isFirefox = typeof InstallTrigger !== 'undefined';
		    // Safari 3.0+ "[object HTMLElementConstructor]" 
		    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
		    // Internet Explorer 6-11
		    var isIE = /*@cc_on!@*/false || !!document.documentMode;
		    // Edge 20+
		    var isEdge = !isIE && !!window.StyleMedia;
		    // Chrome 1+
		    var isChrome = !!window.chrome && !!window.chrome.webstore;
		    // Blink engine detection
		    var isBlink = (isChrome || isOpera) && !!window.CSS;

		    return {
		    	isOpera: isOpera,
		    	isFirefox: isFirefox,
		    	isSafari: isSafari,
		    	isIE: isIE,
		    	isEdge: isEdge,
		    	isBlink: isBlink
		    }
		},
		btnSubmitAnimate: function() {
			$('button[type="submit"]').not(".no-spinner")
				.addClass('ladda-button')
				.attr('data-style', 'zoom-in')
				// .attr('data-label', 'zoom-in');

			Ladda.bind('button[type="submit"]:not(.no-spinner)');

			var browser = Platypus.detectBrowsers();

			if(browser.isSafari || browser.isFirefox) {
				// Prevent Back-Forward-Cache issue
	            $(window).bind("pageshow", function(event) {
	                if (event.originalEvent.persisted) {
	                    Ladda.stopAll();
	                }
	            });
        	}
		},
		inputMaxLength: function() {

			$('input[maxlength], textarea[maxlength]').each(function(){
				
				let $input = $(this);
				
				$input.maxlength({
					alwaysShow: true,
					showOnReady: false,
					// threshold: 10,
					appendToParent: true,
					warningClass: "tag tag-success",
					limitReachedClass: "tag tag-danger"
				}).on('blur', function () {
	             	$input.siblings('span.bootstrap-maxlength').hide();
	          	});
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
					return `<li class="${classes.ellipsisClass}">${label}</li>`;
				},

				dropdown: function(classes) {
					var dropdownClass = 'dropdown'; 
					var dropdownMenuClass = 'dropdown-menu';

					if (this.options.overflow === 'right') {
						dropdownMenuClass += ' dropdown-menu-right';
					}

				 	return `
						<li class="${dropdownClass} ${classes.dropdownClass}">
							<a href="javascript:void(0);" class="${classes.toggleClass}" data-toggle="dropdown">
								<i class="${classes.toggleIconClass}"></i>
							</a>
							<ul class="${dropdownMenuClass} ${classes.dropdownMenuClass}"></ul>
						</li>
					`;				},

				dropdownItem: function(classes, label, href) {
					if (!href) {
						return `
							<li class="${classes.dropdownItemClass} ${classes.dropdownItemDisableClass}">
								<a href="#">${label}</a>
							</li>
						`;
					}
					return `
						<li class="${classes.dropdownItemClass}">
							<a href="${href}">${label}</a>
						</li>
						`;
				},
				// callbacks
				onInit: null,
				onReady: null
			});
		},
		cards: function() {
			
			$('.card-hover-effect').on('mouseover', function () {
			    let $this = $(this);
			    let effect = 'bounceIn';

			    $this
			        .addClass('animated ' + effect)
			        .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			        $this.removeClass('animated ' + effect);
			    });
			});


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
				$(this).closest('.card-flip').flip(true);
			});

			$(".card-flip .btn-unflip").on('click', function(e){
				e.preventDefault();
				$(this).closest('.card-flip').flip(false);
			});

		},
		leftMenu: function() {
			$(".metismenu").metisMenu({
				toggle: true
			});
		},
		carousel: function() {
			$(".carousel").slick({
				dots: true,
				infinite: false,
				arrows: false
			});
		},
		dataTables: function() {

			function initTable($tbl, buttons) {

				let btnMarkup = (buttons.length > 0) ? "<'row'<'col-xs-4 text-xs-left'B><'col-xs-6 text-xs-left'f><'col-xs-2 text-xs-right'l>><'row'<'col-xs-12'tr>><'row'<'col-sm-6 col-xs-12 small'i><'col-sm-6 col-xs-12'p>>" : "<'row'<'col-xs-10 text-xs-left'f><'col-xs-2 text-xs-right'l>><'row'<'col-xs-12'tr>><'row'<'col-sm-6 col-xs-12 small'i><'col-sm-6 col-xs-12'p>>";
				let aoBttns = [];

				if(buttons.length>0) {

					
					window.pdfMake.fonts = {
				        Roboto: {
			                normal: 'Roboto-Regular.ttf',
			                bold: 'Roboto-Medium.ttf',
			                italics: 'Roboto-Italic.ttf',
			                bolditalics: 'Roboto-MediumItalic.ttf'
				        }
				    };
					
					$tbl.on('init.dt', function (e, settings, json) {
			            var api = new $.fn.dataTable.Api(settings);
			            if (api.buttons().length > 0) {
			 
			                $("a", api.buttons().container(0)).each(function (index) {
			                    $(this).attr('data-toggle', 'tooltip');
			                    $(this).attr('data-placement', 'top');
			                });
			                 
			                $('[data-toggle="tooltip"]').tooltip();
			            }
			        });
			
				    for(i=0;i<=buttons.length; i++){
				    	switch(buttons[i]) {
				    		case 'copy':
				    			if(buttons.indexOf('copy') !== -1) {
					    			aoBttns.push({
					    				extend: 'copy', 
			                            classname: 'btn', 
			                            text: '<i class="fa fa-files-o"></i>',
			                            titleAttr: 'Copy to Clipboard' 
					    			});
				    			}
				    			break;

				    		case 'csv':
				    			if(buttons.indexOf('csv') !== -1) {
					    			aoBttns.push({
			                            extend: 'csv', 
			                            classname: 'btn',
			                            text: '<i class="fa fa-file-text"></i>',
			                            titleAttr: 'Download as .CSV'   				    				
					    			});
				    			}
				    			break;
				    			
				    		case 'excel':
				    			if(buttons.indexOf('excel') !== -1) {
					    			aoBttns.push({
		                            	extend: 'excel', 
			                            classname: 'btn',
			                            text: '<i class="fa fa-file-excel-o"></i>',
			                            titleAttr: 'Download as Excel' 				    				
					    			});
					    		}
				    			break;
				    			
				    		case 'pdf':
				    			if(buttons.indexOf('pdf') !== -1) {
					    			aoBttns.push({
			                            extend: 'pdf', 
			                            classname: 'btn',
			                            text: '<i class="fa fa-file-pdf-o"></i>',
			                            titleAttr: 'Download as .PDF',
			                            /*
			                            customize: function (doc) {
					                        doc.defaultStyle = {
					                                font: 'Roboto'
					                        }
					                    }
					                    */				    				
					    			});
				    			}
				    			break;
				    			
				    		case 'print':
				    			if(buttons.indexOf('print') !== -1) {
					    			aoBttns.push({
			                            extend: 'print', 
			                            classname: 'btn',
			                            text: '<i class="fa fa-print"></i>',
			                            titleAttr: 'Print' 				    				
					    			});
					    		}
				    			break;

				    		case 'colvis':
				    			if(buttons.indexOf('colvis') !== -1) {
					    			aoBttns.push({
			                            extend: 'colvis', 
			                            classname: 'btn',
			                            text: '<i class="fa fa-eye"></i>',
			                            titleAttr: 'Hide/Show Columns'  				    				
					    			});
				    			}
				    			break;
				    			
				    	}
				    }

					$.extend( true, $.fn.dataTable.Buttons.defaults, {
						buttons: aoBttns
					});
				}

				$tbl.DataTable({
					responsive: {
						details: {
							type: 'column',
							target: -1
						}
					},
					columnDefs: [{ className: 'control', orderable: false, targets: -1 }],
					dom: btnMarkup,
					stateSave: true,
					pagingType: 'full_numbers',
					"oLanguage": {
						sSearch: "",
						sSearchPlaceholder: "Filter records",
						sLengthMenu: "_MENU_",
						oPaginate: {
					   		sNext: '<i class="fa fa-forward"></i>',
					   		sPrevious: '<i class="fa fa-backward"></i>',
					   		sFirst: '<i class="fa fa-step-backward"></i>',
					   		sLast: '<i class="fa fa-step-forward"></i>'
					   	}
					}
				});

			}

			$('.datatable').each(function() {

				let $tbl = $(this);
				let src = ($tbl.data('src') && $tbl.data('src') !== '') ? $tbl.data('src') : false;
				let cols = ($tbl.data('cols') && $tbl.data('cols') !== '') ? $tbl.data('cols').split(',') : false;
				let buttons = ($tbl.data('buttons') && $tbl.data('buttons') !== '') ? $tbl.data('buttons').split(',') : false;
				let p;
				
				if(buttons) {
					// TODO - load only necessary dependencies
					console.log("DataTable 'data-buttons' attribute found, loading remote dependecies...");
					p = Promise.all([
		                // load.js("/vendor/pdfmake/build/pdfmake.min.js"),
		                // load.js("/vendor/pdfmake/build/vfs_fonts.js"),
		                load.css("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/buttons/1.3.1/css/buttons.dataTables.min.css"),
		                load.js("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/buttons/1.3.1/js/dataTables.buttons.min.js"), 
		                load.js("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/jszip/3.1.3/jszip.min.js"),
		                load.js("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/buttons/1.3.1/js/buttons.html5.min.js"),
		                load.js("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/buttons/1.3.1/js/buttons.print.min.js"),
		                load.js("https://s3.us-east-2.amazonaws.com/platypus-hbs/vendor/datatables/buttons/1.3.1/js/buttons.colVis.min.js"),
		          	]);
	        	}

				if(src && cols) {
					
					$.ajax(src, {
						success: function success(data) {

							data.forEach(function (item) {
								$tbl.find('tbody').append("<tr></tr>");
								cols.forEach(function(col){
									$tbl.find('tbody tr:last-child').append("<td>" + item[col] +"</td>");
								})							
								$tbl.find('tbody tr:last-child').append("<td></td>");									
							});		

							if(buttons) {
								p.then(function(){
									initTable($tbl, buttons);
								}).catch(function(e) {
					                console.log('Cannot load DataTables button remote dependecies:'+e);
					            });
					        } else {
					        	initTable($tbl, buttons);
					        }
							

						},
						error: function error(request, status, error) {
							console.log(request, status, error);
							swal('Error', 'Cannot retrieve data.', 'error');
						}
					});
				} else {

					// Initialize normal datatables
					initTable($tbl, buttons);
				
				}
			
			});
			
		},

		toolTip: function() {
			$('[data-toggle="tooltip"]').on('click', function(e){
				e.preventDefault();
			});
			$('[data-toggle="tooltip"]').tooltip();
		},
		popOver: function() {
			$('[data-toggle="popover"]').on('click', function(e){
				e.preventDefault();
			});
			$('[data-toggle="popover"]').popover();
		},
		select2: function() {

			  function templateResult (item) {
			    	var markup = `
				    	<div class="row">
				    		<div class="col-sm-4">${item.text}</div>
				    		<div class="col-sm-4">${item.name}</div>
				    		<div class="col-sm-4">${item.id}</div>
				    	</div>`
			    	return markup;
			  	}

			  	function templateSelection (item) {
			    	return item.text;
			  	}

				$('.select2').each(function(){
					let $this = $(this);
					let source = $this.data('source');
					if ( source && source != '' ){

						$this.select2({
						    ajax: {
						      	url: source,
						      	dataType: 'json',
						      	delay: 250,
						      	data: function (params) {
						        	return {
						            	q: params.term ? params.term : "a", // search term
						          		page: params.page
						        	};
						      	},
						      	processResults: function (data, params) {
						        	params.page = params.page || 1;

						        	return {
						          		results: $.map(data, function (item) {
					                    	return {
					                        	text: item.first_name,
					                        	name: item.last_name,
					                        	id: item.first_name
					                    	}
					              		}),
						          	
						          	pagination: {
						            more: (params.page * 30) < data.total_count
						          }
						        };
						      },
						      cache: true
						    },
						    escapeMarkup: function (markup) { return markup; },
						    minimumInputLength: 0,
						    templateResult: templateResult,
						    templateSelection: templateSelection
						  });

					} else {
						$this.select2({
							theme: "bootstrap",
							placeholder: 'Select an option'
						});
					}
				})


		},
		dateRange: function() {
			$('input.daterange').daterangepicker({
				"startDate": $(this).data("start-date"),
			    "endDate": $(this).data("end-date"),
				"maxDate": $(this).data("max-date"),
				"minDate": $(this).data("min-date"),
			});
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

		},
		gauges: function() {
			$(".dial").each(function () {
				$(this).knob({
					fgColor: $(this).data('color') !== '' ? $(this).data('color') : 'green'
				});
			});
		},
		progressBar: function(){
			$('.progress .progress-bar').hide();
			$('.progress .progress-bar').css("width", "0%");
			$('.progress .progress-bar').show();
			setTimeout(function(){
				$('.progress .progress-bar').css("width", function() {
	                    return $(this).attr("aria-valuenow") + "%";
	                });
			}, 500);


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
				"positionClass": ( $('html').hasClass('xs') || $('html').hasClass('sm') ) ? "toast-bottom-center" : "toast-top-right",
				"preventDuplicates": true,
				"onclick": null,
				"showDuration": "300",
				"hideDuration": "1500",
				"timeOut": "1500",
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
				down: "fa fa-arrow-down",
				previous: 'fa fa-angle-left',
            	next: 'fa fa-angle-right',
            	today: 'fa fa-bullseye',
            	clear: 'fa fa-tash',
				close: 'fa fa-close'
			};
			
			$('.datetime-picker').each(function(){

				var format = $(this).data('format') != '' ? $(this).data('format') : 'MM-DD-YYYY';
				var inline = ( $(this).data('inline') != '' && $(this).data('inline') == true) ? true : false;

				$(this).datetimepicker({
					locale: 'en',
					format: format,
					icons: customIcons,
					keepOpen: false,
					inline: inline,
                	sideBySide: true,
					debug: false, // date picker stays open after a blur event.
				});
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

			// TODO: Refactor this while thing, cache $('form'), break it apart into smaller modules

			// Enable navigate away / close window prompt
			// TODO: Only bind if data has changed
			if ( $('form').hasClass('navigate-away-warning') ) {
				window.onbeforeunload = function() { return true; };
			} else {
				window.onbeforeunload = null;
			}

			$('form small').each(function () {
				var helpText = $(this).html();
				var tooltipHelp = `<a href="#" class="" data-toggle="tooltip" data-placement="right" title="${helpText}"><i class="fa fa-question-circle-o fa-fw"></i></a>`;
				$(this).closest('.form-group .col-md-8').find('label').append(tooltipHelp);
			});

			// $('form *:input[type!=hidden]:first').focus();

			$('input,textarea,select').filter('[required]').each(function () {
				$(this).closest('.form-group').find('label:not(".custom-control"):first-child').append(" <span class='float-xs-right text-danger'>*</span>");
			});

			$('input[type="password"].meter').strength({
			    wrapper: true,
			    showHideButtonText: 'Show',
			    showHideButtonTextToggle: 'Hide'
			});

			$('.rating-tooltip-manual').rating({
			  extendSymbol: function () {
			    var title;
			    $(this).tooltip({
			      container: 'body',
			      placement: 'bottom',
			      trigger: 'manual',
			      title: function () {
			        return title;
			      }
			    });
			    $(this).on('rating.rateenter', function (e, rate) {
			      title = rate;
			      $(this).tooltip('show');
			    })
			    .on('rating.rateleave', function () {
			      $(this).tooltip('hide');
			    });
			  }
			});

			$('form .go-back').on('click', function(e) {
				e.preventDefault();
				 window.history.back();
			});

			$('.confirm-delete').on('click', function(e) {
			    e.preventDefault();
			    let el = $(this),
			    	title = (el.data('confirm-delete-title') && el.data('confirm-delete-title') !== '') ? el.data('confirm-delete-title') : 'Are you sure?',
			    	text = (el.data('confirm-delete-text') && el.data('confirm-delete-text') !== '') ? el.data('confirm-delete-text') : "This action cannot be reverted.";

			    swal({
				  	title: title,
				  	text: text,
				  	type: 'warning',
				  	showCancelButton: true,
				  	confirmButtonText: 'Delete'
				}).then(function () {
					let parentForm = $(el).closest('form');
				  	if ( parentForm.length > 0 ) {
				  		parentForm.submit();
				  	} else {
				  		window.location.href = $(el).attr("href");
				  	}
				  	Ladda.stopAll();
				  	// swal(
				    //  	'Deleted!',
				    //  	'Item successfully removed.',
				    //  	'success'
				  	// );
				}, function(dismiss){
					Ladda.stopAll();
				})
			});

			$('.fileinput').fileinput();

			$('.populate-ul').each(function(){
				let $el = $(this);
				let type = $el.data('populate-ul-type');
				let geo = $el.data('ip-geo-locate');
				let geoLocateResponse;
				let countries = [ 
					{"name": "", "code": ""}, 
					{"name": "Afghanistan", "code": "AF"}, 
					{"name": "land Islands", "code": "AX"}, 
					{"name": "Albania", "code": "AL"}, 
					{"name": "Algeria", "code": "DZ"}, 
					{"name": "American Samoa", "code": "AS"}, 
					{"name": "AndorrA", "code": "AD"}, 
					{"name": "Angola", "code": "AO"}, 
					{"name": "Anguilla", "code": "AI"}, 
					{"name": "Antarctica", "code": "AQ"}, 
					{"name": "Antigua and Barbuda", "code": "AG"}, 
					{"name": "Argentina", "code": "AR"}, 
					{"name": "Armenia", "code": "AM"}, 
					{"name": "Aruba", "code": "AW"}, 
					{"name": "Australia", "code": "AU"}, 
					{"name": "Austria", "code": "AT"}, 
					{"name": "Azerbaijan", "code": "AZ"}, 
					{"name": "Bahamas", "code": "BS"}, 
					{"name": "Bahrain", "code": "BH"}, 
					{"name": "Bangladesh", "code": "BD"}, 
					{"name": "Barbados", "code": "BB"}, 
					{"name": "Belarus", "code": "BY"}, 
					{"name": "Belgium", "code": "BE"}, 
					{"name": "Belize", "code": "BZ"}, 
					{"name": "Benin", "code": "BJ"}, 
					{"name": "Bermuda", "code": "BM"}, 
					{"name": "Bhutan", "code": "BT"}, 
					{"name": "Bolivia", "code": "BO"}, 
					{"name": "Bosnia and Herzegovina", "code": "BA"}, 
					{"name": "Botswana", "code": "BW"}, 
					{"name": "Bouvet Island", "code": "BV"}, 
					{"name": "Brazil", "code": "BR"}, 
					{"name": "British Indian Ocean Territory", "code": "IO"}, 
					{"name": "Brunei Darussalam", "code": "BN"}, 
					{"name": "Bulgaria", "code": "BG"}, 
					{"name": "Burkina Faso", "code": "BF"}, 
					{"name": "Burundi", "code": "BI"}, 
					{"name": "Cambodia", "code": "KH"}, 
					{"name": "Cameroon", "code": "CM"}, 
					{"name": "Canada", "code": "CA"}, 
					{"name": "Cape Verde", "code": "CV"}, 
					{"name": "Cayman Islands", "code": "KY"}, 
					{"name": "Central African Republic", "code": "CF"}, 
					{"name": "Chad", "code": "TD"}, 
					{"name": "Chile", "code": "CL"}, 
					{"name": "China", "code": "CN"}, 
					{"name": "Christmas Island", "code": "CX"}, 
					{"name": "Cocos (Keeling) Islands", "code": "CC"}, 
					{"name": "Colombia", "code": "CO"}, 
					{"name": "Comoros", "code": "KM"}, 
					{"name": "Congo", "code": "CG"}, 
					{"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
					{"name": "Cook Islands", "code": "CK"}, 
					{"name": "Costa Rica", "code": "CR"}, 
					{"name": "Cote D'Ivoire", "code": "CI"}, 
					{"name": "Croatia", "code": "HR"}, 
					{"name": "Cuba", "code": "CU"}, 
					{"name": "Cyprus", "code": "CY"}, 
					{"name": "Czech Republic", "code": "CZ"}, 
					{"name": "Denmark", "code": "DK"}, 
					{"name": "Djibouti", "code": "DJ"}, 
					{"name": "Dominica", "code": "DM"}, 
					{"name": "Dominican Republic", "code": "DO"}, 
					{"name": "Ecuador", "code": "EC"}, 
					{"name": "Egypt", "code": "EG"}, 
					{"name": "El Salvador", "code": "SV"}, 
					{"name": "Equatorial Guinea", "code": "GQ"}, 
					{"name": "Eritrea", "code": "ER"}, 
					{"name": "Estonia", "code": "EE"}, 
					{"name": "Ethiopia", "code": "ET"}, 
					{"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
					{"name": "Faroe Islands", "code": "FO"}, 
					{"name": "Fiji", "code": "FJ"}, 
					{"name": "Finland", "code": "FI"}, 
					{"name": "France", "code": "FR"}, 
					{"name": "French Guiana", "code": "GF"}, 
					{"name": "French Polynesia", "code": "PF"}, 
					{"name": "French Southern Territories", "code": "TF"}, 
					{"name": "Gabon", "code": "GA"}, 
					{"name": "Gambia", "code": "GM"}, 
					{"name": "Georgia", "code": "GE"}, 
					{"name": "Germany", "code": "DE"}, 
					{"name": "Ghana", "code": "GH"}, 
					{"name": "Gibraltar", "code": "GI"}, 
					{"name": "Greece", "code": "GR"}, 
					{"name": "Greenland", "code": "GL"}, 
					{"name": "Grenada", "code": "GD"}, 
					{"name": "Guadeloupe", "code": "GP"}, 
					{"name": "Guam", "code": "GU"}, 
					{"name": "Guatemala", "code": "GT"}, 
					{"name": "Guernsey", "code": "GG"}, 
					{"name": "Guinea", "code": "GN"}, 
					{"name": "Guinea-Bissau", "code": "GW"}, 
					{"name": "Guyana", "code": "GY"}, 
					{"name": "Haiti", "code": "HT"}, 
					{"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
					{"name": "Holy See (Vatican City State)", "code": "VA"}, 
					{"name": "Honduras", "code": "HN"}, 
					{"name": "Hong Kong", "code": "HK"}, 
					{"name": "Hungary", "code": "HU"}, 
					{"name": "Iceland", "code": "IS"}, 
					{"name": "India", "code": "IN"}, 
					{"name": "Indonesia", "code": "ID"}, 
					{"name": "Iran, Islamic Republic Of", "code": "IR"}, 
					{"name": "Iraq", "code": "IQ"}, 
					{"name": "Ireland", "code": "IE"}, 
					{"name": "Isle of Man", "code": "IM"}, 
					{"name": "Israel", "code": "IL"}, 
					{"name": "Italy", "code": "IT"}, 
					{"name": "Jamaica", "code": "JM"}, 
					{"name": "Japan", "code": "JP"}, 
					{"name": "Jersey", "code": "JE"}, 
					{"name": "Jordan", "code": "JO"}, 
					{"name": "Kazakhstan", "code": "KZ"}, 
					{"name": "Kenya", "code": "KE"}, 
					{"name": "Kiribati", "code": "KI"}, 
					{"name": "Korea, Democratic People's Republic of", "code": "KP"}, 
					{"name": "Korea, Republic of", "code": "KR"}, 
					{"name": "Kuwait", "code": "KW"}, 
					{"name": "Kyrgyzstan", "code": "KG"}, 
					{"name": "Lao People's Democratic Republic", "code": "LA"}, 
					{"name": "Latvia", "code": "LV"}, 
					{"name": "Lebanon", "code": "LB"}, 
					{"name": "Lesotho", "code": "LS"}, 
					{"name": "Liberia", "code": "LR"}, 
					{"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
					{"name": "Liechtenstein", "code": "LI"}, 
					{"name": "Lithuania", "code": "LT"}, 
					{"name": "Luxembourg", "code": "LU"}, 
					{"name": "Macao", "code": "MO"}, 
					{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
					{"name": "Madagascar", "code": "MG"}, 
					{"name": "Malawi", "code": "MW"}, 
					{"name": "Malaysia", "code": "MY"}, 
					{"name": "Maldives", "code": "MV"}, 
					{"name": "Mali", "code": "ML"}, 
					{"name": "Malta", "code": "MT"}, 
					{"name": "Marshall Islands", "code": "MH"}, 
					{"name": "Martinique", "code": "MQ"}, 
					{"name": "Mauritania", "code": "MR"}, 
					{"name": "Mauritius", "code": "MU"}, 
					{"name": "Mayotte", "code": "YT"}, 
					{"name": "Mexico", "code": "MX"}, 
					{"name": "Micronesia, Federated States of", "code": "FM"}, 
					{"name": "Moldova, Republic of", "code": "MD"}, 
					{"name": "Monaco", "code": "MC"}, 
					{"name": "Mongolia", "code": "MN"}, 
					{"name": "Montenegro", "code": "ME"},
					{"name": "Montserrat", "code": "MS"},
					{"name": "Morocco", "code": "MA"}, 
					{"name": "Mozambique", "code": "MZ"}, 
					{"name": "Myanmar", "code": "MM"}, 
					{"name": "Namibia", "code": "NA"}, 
					{"name": "Nauru", "code": "NR"}, 
					{"name": "Nepal", "code": "NP"}, 
					{"name": "Netherlands", "code": "NL"}, 
					{"name": "Netherlands Antilles", "code": "AN"}, 
					{"name": "New Caledonia", "code": "NC"}, 
					{"name": "New Zealand", "code": "NZ"}, 
					{"name": "Nicaragua", "code": "NI"}, 
					{"name": "Niger", "code": "NE"}, 
					{"name": "Nigeria", "code": "NG"}, 
					{"name": "Niue", "code": "NU"}, 
					{"name": "Norfolk Island", "code": "NF"}, 
					{"name": "Northern Mariana Islands", "code": "MP"}, 
					{"name": "Norway", "code": "NO"}, 
					{"name": "Oman", "code": "OM"}, 
					{"name": "Pakistan", "code": "PK"}, 
					{"name": "Palau", "code": "PW"}, 
					{"name": "Palestinian Territory, Occupied", "code": "PS"}, 
					{"name": "Panama", "code": "PA"}, 
					{"name": "Papua New Guinea", "code": "PG"}, 
					{"name": "Paraguay", "code": "PY"}, 
					{"name": "Peru", "code": "PE"}, 
					{"name": "Philippines", "code": "PH"}, 
					{"name": "Pitcairn", "code": "PN"}, 
					{"name": "Poland", "code": "PL"}, 
					{"name": "Portugal", "code": "PT"}, 
					{"name": "Puerto Rico", "code": "PR"}, 
					{"name": "Qatar", "code": "QA"}, 
					{"name": "Reunion", "code": "RE"}, 
					{"name": "Romania", "code": "RO"}, 
					{"name": "Russian Federation", "code": "RU"}, 
					{"name": "RWANDA", "code": "RW"}, 
					{"name": "Saint Helena", "code": "SH"}, 
					{"name": "Saint Kitts and Nevis", "code": "KN"}, 
					{"name": "Saint Lucia", "code": "LC"}, 
					{"name": "Saint Pierre and Miquelon", "code": "PM"}, 
					{"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
					{"name": "Samoa", "code": "WS"}, 
					{"name": "San Marino", "code": "SM"}, 
					{"name": "Sao Tome and Principe", "code": "ST"}, 
					{"name": "Saudi Arabia", "code": "SA"}, 
					{"name": "Senegal", "code": "SN"}, 
					{"name": "Serbia", "code": "RS"}, 
					{"name": "Seychelles", "code": "SC"}, 
					{"name": "Sierra Leone", "code": "SL"}, 
					{"name": "Singapore", "code": "SG"}, 
					{"name": "Slovakia", "code": "SK"}, 
					{"name": "Slovenia", "code": "SI"}, 
					{"name": "Solomon Islands", "code": "SB"}, 
					{"name": "Somalia", "code": "SO"}, 
					{"name": "South Africa", "code": "ZA"}, 
					{"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
					{"name": "Spain", "code": "ES"}, 
					{"name": "Sri Lanka", "code": "LK"}, 
					{"name": "Sudan", "code": "SD"}, 
					{"name": "Suriname", "code": "SR"}, 
					{"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
					{"name": "Swaziland", "code": "SZ"}, 
					{"name": "Sweden", "code": "SE"}, 
					{"name": "Switzerland", "code": "CH"}, 
					{"name": "Syrian Arab Republic", "code": "SY"}, 
					{"name": "Taiwan, Province of China", "code": "TW"}, 
					{"name": "Tajikistan", "code": "TJ"}, 
					{"name": "Tanzania, United Republic of", "code": "TZ"}, 
					{"name": "Thailand", "code": "TH"}, 
					{"name": "Timor-Leste", "code": "TL"}, 
					{"name": "Togo", "code": "TG"}, 
					{"name": "Tokelau", "code": "TK"}, 
					{"name": "Tonga", "code": "TO"}, 
					{"name": "Trinidad and Tobago", "code": "TT"}, 
					{"name": "Tunisia", "code": "TN"}, 
					{"name": "Turkey", "code": "TR"}, 
					{"name": "Turkmenistan", "code": "TM"}, 
					{"name": "Turks and Caicos Islands", "code": "TC"}, 
					{"name": "Tuvalu", "code": "TV"}, 
					{"name": "Uganda", "code": "UG"}, 
					{"name": "Ukraine", "code": "UA"}, 
					{"name": "United Arab Emirates", "code": "AE"}, 
					{"name": "United Kingdom", "code": "GB"}, 
					{"name": "United States", "code": "US"}, 
					{"name": "United States Minor Outlying Islands", "code": "UM"}, 
					{"name": "Uruguay", "code": "UY"}, 
					{"name": "Uzbekistan", "code": "UZ"}, 
					{"name": "Vanuatu", "code": "VU"}, 
					{"name": "Venezuela", "code": "VE"}, 
					{"name": "Viet Nam", "code": "VN"}, 
					{"name": "Virgin Islands, British", "code": "VG"}, 
					{"name": "Virgin Islands, U.S.", "code": "VI"}, 
					{"name": "Wallis and Futuna", "code": "WF"}, 
					{"name": "Western Sahara", "code": "EH"}, 
					{"name": "Yemen", "code": "YE"}, 
					{"name": "Zambia", "code": "ZM"}, 
					{"name": "Zimbabwe", "code": "ZW"} 
				];
				let states = [
				    { "name": "Alabama", "abbreviation": "AL" },
				    { "name": "Alaska", "abbreviation": "AK" },
				    { "name": "American Samoa", "abbreviation": "AS" },
				    { "name": "Arizona", "abbreviation": "AZ" },
				    { "name": "Arkansas", "abbreviation": "AR" },
				    { "name": "California", "abbreviation": "CA" },
				    { "name": "Colorado", "abbreviation": "CO" },
				    { "name": "Connecticut", "abbreviation": "CT" },
				    { "name": "Delaware", "abbreviation": "DE" },
				    { "name": "District Of Columbia", "abbreviation": "DC" },
				    { "name": "Federated States Of Micronesia", "abbreviation": "FM" },
				    { "name": "Florida", "abbreviation": "FL" },
				    { "name": "Georgia", "abbreviation": "GA" },
				    { "name": "Guam", "abbreviation": "GU" },
				    { "name": "Hawaii", "abbreviation": "HI" },
				    { "name": "Idaho", "abbreviation": "ID" },
				    { "name": "Illinois", "abbreviation": "IL" },
				    { "name": "Indiana", "abbreviation": "IN" },
				    { "name": "Iowa", "abbreviation": "IA" },
				    { "name": "Kansas", "abbreviation": "KS" },
				    { "name": "Kentucky", "abbreviation": "KY" },
				    { "name": "Louisiana", "abbreviation": "LA" },
				    { "name": "Maine", "abbreviation": "ME" },
				    { "name": "Marshall Islands", "abbreviation": "MH" },
				    { "name": "Maryland", "abbreviation": "MD" },
				    { "name": "Massachusetts", "abbreviation": "MA" },
				    { "name": "Michigan", "abbreviation": "MI" },
				    { "name": "Minnesota", "abbreviation": "MN" },
				    { "name": "Mississippi", "abbreviation": "MS" },
				    { "name": "Missouri", "abbreviation": "MO" },
				    { "name": "Montana", "abbreviation": "MT" },
				    { "name": "Nebraska", "abbreviation": "NE" },
				    { "name": "Nevada", "abbreviation": "NV" },
				    { "name": "New Hampshire", "abbreviation": "NH" },
				    { "name": "New Jersey", "abbreviation": "NJ" },
				    { "name": "New Mexico", "abbreviation": "NM" },
				    { "name": "New York", "abbreviation": "NY" },
				    { "name": "North Carolina", "abbreviation": "NC" },
				    { "name": "North Dakota", "abbreviation": "ND" },
				    { "name": "Northern Mariana Islands", "abbreviation": "MP" },
				    { "name": "Ohio", "abbreviation": "OH" },
				    { "name": "Oklahoma", "abbreviation": "OK" },
				    { "name": "Oregon", "abbreviation": "OR" },
				    { "name": "Palau", "abbreviation": "PW" },
				    { "name": "Pennsylvania", "abbreviation": "PA" },
				    { "name": "Puerto Rico", "abbreviation": "PR" },
				    { "name": "Rhode Island", "abbreviation": "RI" },
				    { "name": "South Carolina", "abbreviation": "SC" },
				    { "name": "South Dakota", "abbreviation": "SD" },
				    { "name": "Tennessee", "abbreviation": "TN" },
				    { "name": "Texas", "abbreviation": "TX" },
				    { "name": "Utah", "abbreviation": "UT" },
				    { "name": "Vermont", "abbreviation": "VT" },
				    { "name": "Virgin Islands", "abbreviation": "VI" },
				    { "name": "Virginia", "abbreviation": "VA" },
				    { "name": "Washington", "abbreviation": "WA" },
				    { "name": "West Virginia", "abbreviation": "WV" },
				    { "name": "Wisconsin", "abbreviation": "WI" },
				    { "name": "Wyoming", "abbreviation": "WY" }
				]

				if(geo) {
					$.ajax({
						url: 'http://freegeoip.net/json/',
						method: 'GET',
						success: function(data){
							geoLocateResponse = data;
							// console.log(geoLocateResponse);
							populate(true);
						}
					});
				}

				function populate(geo) {
					switch(type){
						case 'country':
							countries.forEach(function(country){
								$el.append(`<option value="${country.name}">${country.name}</option>`);
								if (geo && geoLocateResponse !== '') $el.find('option[value="'+geoLocateResponse.country_name+'"]').attr('selected', true);
							});
							break;
						case 'state':
							states.forEach(function(state){
								$el.append(`<option value="${state.abbreviation}">${state.name}</option>`);
								if (geo && geoLocateResponse !== '') $el.find('option[value="'+geoLocateResponse.region_code+'"]').attr('selected', true);
							});
							break;
						default:
							console.log('Invalid .populate-ul data-populate-ul-type value');
					}
				}
				

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
		formAddress: function(){

			if ( $('input#autocomplete').length > 0 ) {
				// This example displays an address form, using the autocomplete feature
				// of the Google Places API to help users fill in the information.

				$('.confirm-edit-address').hide();

				$("#autocomplete").on('focus', function () {
				    geolocate();
				});

				var placeSearch, autocomplete;
				var componentForm = {
				    street_number: 'short_name',
				    route: 'long_name',
				    locality: 'long_name',
				    administrative_area_level_1: 'short_name',
				    country: 'long_name',
				    postal_code: 'short_name'
				};

				function initialize() {
				    // Create the autocomplete object, restricting the search
				    // to geographical location types.
				    autocomplete = new google.maps.places.Autocomplete(
				    /** @type {HTMLInputElement} */ (document.getElementById('autocomplete')), {
				        types: ['geocode']
				    });
				    // When the user selects an address from the dropdown,
				    // populate the address fields in the form.
				    google.maps.event.addListener(autocomplete, 'place_changed', function () {
				        fillInAddress();
				    });
				}

				// [START region_fillform]
				function fillInAddress() {

					$('.confirm-edit-address').show();

				    // Get the place details from the autocomplete object.
				    var place = autocomplete.getPlace();

				    document.getElementById("latitude").value = place.geometry.location.lat();
				    document.getElementById("longitude").value = place.geometry.location.lng();

				    for (var component in componentForm) {
				        document.getElementById(component).value = '';
				        document.getElementById(component).disabled = false;
				    }

				    // Get each component of the address from the place details
				    // and fill the corresponding field on the form.
				    for (var i = 0; i < place.address_components.length; i++) {
				        var addressType = place.address_components[i].types[0];
				        if (componentForm[addressType]) {
				            var val = place.address_components[i][componentForm[addressType]];
				            document.getElementById(addressType).value = val;
				        }
				    }
				}
				
				// Bias the autocomplete object to the user's geographical location,
				// as supplied by the browser's 'navigator.geolocation' object.
				function geolocate() {
				    if (navigator.geolocation) {
				        navigator.geolocation.getCurrentPosition(function (position) {
				            var geolocation = new google.maps.LatLng(
				            position.coords.latitude, position.coords.longitude);

				            var latitude = position.coords.latitude;
				            var longitude = position.coords.longitude;
				            document.getElementById("latitude").value = latitude;
				            document.getElementById("longitude").value = longitude;

				            autocomplete.setBounds(new google.maps.LatLngBounds(geolocation, geolocation));
				        });
				    }

				}

				initialize();
			
			}
		},
		slimScroll: function() {
			$('.sidebar, .modal-body').slimScroll({
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

			// Insert modal

			var modalMarkup = `
			<!-- Universal Modal -->
			<div class="modal fade" id="universal-modal" tabindex="-1" role="dialog" aria-hidden="true">
			    <div class="modal-dialog" role="document">
			        <div class="modal-content">
			            <div class="modal-header">
			                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			                    <span aria-hidden="true">&times;</span>
			                </button>
			                <h5 class="modal-title"></h5>
			            </div>
			            <div class="modal-body">
			            </div>
			            <div class="modal-footer">
			            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			            </div>
			        </div>
			    </div>
			</div>
			`;

			$('body').append(modalMarkup);
			$(document).on('click', '.modal-remote', function(e){
				e.preventDefault();
				
				var $bttn = $(this);
				var opts = {
					title: $bttn.data('modal-title') !== '' ? $bttn.data('modal-title') : '',
					size: $bttn.data('modal-size') !== '' ? $bttn.data('modal-size') : 'md',
					header: $bttn.data('modal-header') !== '' ? $bttn.data('modal-header') : true,
					footer: $bttn.data('modal-footer') !== '' ?  $bttn.data('modal-footer')  : true,
					iframe: $bttn.data('modal-iframe') !== '' ?  $bttn.data('modal-iframe')  : false,
					scrollable: $bttn.data('modal-scrollable') !== '' ?  $bttn.data('modal-scrollable')  : false,
				}
				var modalID = 'modal-'+Math.random().toString(36).substring(7);
				
				$bttn.attr('data-target', '#modal-'+modalID);
				
				// Repurpose universal modal
				$('#universal-modal').attr('id', modalID);
				
				// Wire modal events
				$(document).on('show.bs.modal', ('#'+modalID), function(e) {  
					if(opts.title) $('#'+modalID).find('.modal-title').html( opts.title );
					if(opts.size) $('#'+modalID).find('.modal-dialog').addClass('modal-'+opts.size );
					if(!opts.header) $('#'+modalID).find('.modal-header').hide();
					if(!opts.footer) $('#'+modalID).find('.modal-footer').hide();
					if (opts.iframe) {
						$('#'+modalID).find('.modal-body').html('<iframe width="100%" height="100%" frameborder="0" scrolling="'+ (opts.scrollable ? 'yes' : 'no') +'" allowtransparency="true" src="'+$bttn.attr('href')+'"></iframe>');
						$('#'+modalID).find('.modal-body iframe').css('height', ($(window).height()-180) + 'px');
					} else {
						$('#'+modalID).find('.modal-body').load( $bttn.attr('href'), function(){
							console.log("Loading async data into modal");
						});
						if(opts.scrollable) $('#'+modalID).find('.modal-body').addClass('scrollable');
						
					}
					
				});

				// Display modal
				$('#'+modalID).modal('show');

				$(document).on('shown.bs.modal', '.modal', function(e) {  
					window.Platypus.wizard();
					window.Platypus.inputMaxLength();
				});

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
			$('.rotating-bg').css('background-image', 'url("https://s3.us-east-2.amazonaws.com/platypus-hbs/version/'+currentVersion+'/images/rotating-bg-hbs/bg-hbs-' + _.random(1, 4) + '.png")');
		},

		inlineEdit: function() {

			$('.edit-inline').each(function(){

				let postUrl = $(this).data('post-url');
				let content = '';

				$(this).summernote({
					airMode: true,
					popover: {
			         	image: [],
			         	link: [],
			         	air: []
			       	},
					callbacks: {
						onInit: function() {
					      	// console.log('summernote onInit callback fired');
					      	if ( $(this).summernote('isEmpty') ) {
					      		$(this).val('');
					      		$(this).addClass('empty');
					      	} 
					    },
						onFocus: function(){
							// console.log('summernote OnFocus callback fired');
							$('.note-air-popover').show();
							$(this).removeClass('empty');
							content = $(this).summernote('code');

						},
						onBlur: function(){
							// console.log('summernote onBlur callback fired');
							$('.note-air-popover').hide();
							// console.log( $(this) );
							if ( $(this).summernote('isEmpty') ) {
					      		$(this).val('');
					      		$(this).addClass('empty');
					      	} 
					      	if (content !== $(this).summernote('code')) postData( $(this) );
					      	
						},
						onChange: function(contents, $editable) {
					      	// console.log('summernote onChange callback fired:', contents, $editable);
					    }
					}
				});

				function postData($el){

					var data = {};
					data.body = $el.summernote('code');

					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: postUrl,						
                        success: function(data) {
                            toastr.success('Item updated successfully.');
                        },
                        error: function (request, status, error) {
					        toastr.error('Cannot update item.');
					    }
                    });


				}

				$('.note-editable a').hover(function(){
					$('.note-editable').attr('contenteditable','false')
				}, function(){
					$('.note-editable').attr('contenteditable','true')
				});

			});
			
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
			}).addClass("external").attr('target', '_blank');
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
            $('.btn-ajax-spin').on({

                ajaxStart: function(e) {

                	console.log("Target of ajaxStart is:", e.target);

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
			
			if ( $('body').data('feedback-url') ) {
				
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
			
			}

		},

		renderCharts: function() {

			$('.chart').each(function() {
				let type = $(this).data('type');
				let target = '#'+$(this).attr('id');								
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
						chart.flush();
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
						chart.flush();
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
						chart.flush();
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
						chart.flush();
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
						chart.flush();
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
						chart.flush();
						break;
					default: 
				}
			});
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

		helpful: function(){
			$('.helpful-widget button').on('click', function(e){
				e.preventDefault();
				
				let id = $(this).closest('.helpful-widget').data('article-id'),
					val = $(this).hasClass('yes') ? '+1' : '-1';

				var data = {};
				data.val = val;

				$.ajax({
					type: 'POST',
					data: JSON.stringify(data),
			        contentType: 'application/json',
                    url: '/articles/score/'+id,						
                    success: function(data) {
                        toastr.success(data.score);
                        $('.helpful-widget').hide();
                    },
                    error: function (request, status, error) {
				        console.log(error);
				        toastr.error('Cannot update score. ');

				    }
                });

			})
		},
		googleMaps: function(){

			if( $('.google-map').length > 0 ) {
				
				let geocoder = new google.maps.Geocoder();

				$('.google-map').each(function(map){	
									
					let m = new google.maps.Map(document.getElementById( $(this).attr('id') ), {
				      	zoom: $(this).data('map-zoom') || 10, 
				      	center: {
				      		lat: $(this).data('map-lat') || 42.365515, 
				      		lng: $(this).data('map-lng') || -71.122141
				      	}, 
				      	mapTypeId: $(this).data('map-type') || 'roadmap'
				    });

					if ( $(this).data('map-address') ) {
						geocodeAddress(geocoder, $(this).data('map-address'), m);
					}

					function geocodeAddress(geocoder, address, resultsMap) {
				        geocoder.geocode({'address': address}, function(results, status) {
				        if (status === 'OK') {
				            resultsMap.setCenter(results[0].geometry.location);
				            var marker = new google.maps.Marker({
				              map: resultsMap,
				              position: results[0].geometry.location
				            });
				        } else {
				            alert('Geocode was not successful for the following reason: ' + status);
				          }
				        });
				     }

				    // has markers? (TODO)
				    
				});
			}
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