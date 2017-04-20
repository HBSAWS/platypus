'use strict';

;(function ($, window) {
	var AWSFrameworkDemo = {
		ondomready: function ondomready() {
			AWSFrameworkDemo.toastDemo();
			AWSFrameworkDemo.sweetAlertDemo();
			AWSFrameworkDemo.validation();
			AWSFrameworkDemo.icons();
			AWSFrameworkDemo.search();
			AWSFrameworkDemo.maps();
			AWSFrameworkDemo.dataTablesDemo();
			AWSFrameworkDemo.calendarDemo();
		},
		toastDemo: function toastDemo() {
			$('#toastr-demo button').click(function (e) {
				e.preventDefault();
				if ($(this).hasClass('btn-success')) {
					toastr.success('whohoo!');
				} else if ($(this).hasClass('btn-warning')) {
					toastr.warning('careful, son.');
				} else if ($(this).hasClass('btn-info')) {
					toastr.info('some info.');
				} else if ($(this).hasClass('btn-danger')) {
					toastr.error('oh noes...');
				}
			});
		},
		sweetAlertDemo: function sweetAlertDemo() {
			$('#sweet-alert-demo button').click(function (e) {

				e.preventDefault();
				switch ($(this).data('demo')) {
					case 'one':
						swal('Any fool can use a computer');
						break;
					case 'two':
						swal('The Internet?', 'That thing is still around?', 'question');
						break;
					case 'three':
						swal('Good job!', 'You clicked the button!', 'success');
						break;
					case 'four':
						swal({
							title: 'Auto close alert!',
							text: 'I will close in 2 seconds.',
							timer: 2000
						}).then(function () {},
						// handling the promise rejection
						function (dismiss) {
							if (dismiss === 'timer') {
								console.log('I was closed by the timer');
							}
						});
						break;
					case 'five':
						swal({
							title: '<i>HTML</i> <u>example</u>',
							type: 'info',
							html: 'You can use <b>bold text</b>, ' + '<a href="//github.com">links</a> ' + 'and other HTML tags',
							showCloseButton: true,
							showCancelButton: true,
							confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
							cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
						});
						break;
					case 'six':
						swal({
							title: 'jQuery HTML example',
							html: $('<div>').addClass('some-class').text('jQuery is everywhere.'),
							animation: false,
							customClass: 'animated tada'
						});
						break;
					case 'seven':
						swal({
							title: 'Are you sure?',
							text: "You won't be able to revert this!",
							type: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes, delete it!'
						}).then(function () {
							swal('Deleted!', 'Your file has been deleted.', 'success');
						});
						break;
					case 'eight':
						swal({
							title: 'Are you sure?',
							text: "You won't be able to revert this!",
							type: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes, delete it!',
							cancelButtonText: 'No, cancel!',
							confirmButtonClass: 'btn btn-success',
							cancelButtonClass: 'btn btn-danger',
							buttonsStyling: false
						}).then(function () {
							swal('Deleted!', 'Your file has been deleted.', 'success');
						}, function (dismiss) {
							// dismiss can be 'cancel', 'overlay',
							// 'close', and 'timer'
							if (dismiss === 'cancel') {
								swal('Cancelled', 'Your imaginary file is safe :)', 'error');
							}
						});
						break;
					case 'nine':
						swal({
							title: 'Sweet!',
							text: 'Modal with a custom image.',
							imageUrl: 'https://unsplash.it/400/200',
							imageWidth: 400,
							imageHeight: 200,
							animation: false
						});
						break;
					case 'ten':
						swal({
							title: 'Custom width, padding, background.',
							width: 600,
							padding: 100,
							background: '#fff url(/images/rotating-bg-hbs/bg-hbs-1.png)'
						});
						break;
					case 'eleven':
						swal({
							title: 'Submit email to run ajax request',
							input: 'email',
							showCancelButton: true,
							confirmButtonText: 'Submit',
							showLoaderOnConfirm: true,
							preConfirm: function preConfirm(email) {
								return new Promise(function (resolve, reject) {
									setTimeout(function () {
										if (email === 'taken@example.com') {
											reject('This email is already taken.');
										} else {
											resolve();
										}
									}, 2000);
								});
							},
							allowOutsideClick: false
						}).then(function (email) {
							swal({
								type: 'success',
								title: 'Ajax request finished!',
								html: 'Submitted email: ' + email
							});
						});
						break;
					case 'twelve':
						swal.setDefaults({
							input: 'text',
							confirmButtonText: 'Next &rarr;',
							showCancelButton: true,
							animation: false,
							progressSteps: ['1', '2', '3']
						});

						var steps = [{
							title: 'Question 1',
							text: 'Chaining swal2 modals is easy'
						}, 'Question 2', 'Question 3'];

						swal.queue(steps).then(function (result) {
							swal.resetDefaults();
							swal({
								title: 'All done!',
								html: 'Your answers: <pre>' + JSON.stringify(result) + '</pre>',
								confirmButtonText: 'Lovely!',
								showCancelButton: false
							});
						}, function () {
							swal.resetDefaults();
						});
						break;
					case 'thirteen':
						swal.queue([{
							title: 'Your public IP',
							confirmButtonText: 'Show my public IP',
							text: 'Your public IP will be received ' + 'via AJAX request',
							showLoaderOnConfirm: true,
							preConfirm: function preConfirm() {
								return new Promise(function (resolve) {
									$.get('https://api.ipify.org?format=json').done(function (data) {
										swal.insertQueueStep(data.ip);
										resolve();
									});
								});
							}
						}]);
						break;
				}
			});
		},
		icons: function icons() {
			var fontawesome = ["address-book", "address-book-o", "address-card", "address-card-o", "bandcamp", "bath", "bathtub", "drivers-license", "drivers-license-o", "eercast", "envelope-open", "envelope-open-o", "etsy", "free-code-camp", "grav", "handshake-o", "id-badge", "id-card", "id-card-o", "imdb", "linode", "meetup", "microchip", "podcast", "quora", "ravelry", "s15", "shower", "snowflake-o", "superpowers", "telegram", "thermometer", "thermometer-0", "thermometer-1", "thermometer-2", "thermometer-3", "thermometer-4", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "times-rectangle", "times-rectangle-o", "user-circle", "user-circle-o", "user-o", "vcard", "vcard-o", "window-close", "window-close-o", "window-maximize", "window-minimize", "window-restore", "wpexplorer", "address-book", "address-book-o", "address-card", "address-card-o", "adjust", "american-sign-language-interpreting", "anchor", "archive", "area-chart", "arrows", "arrows-h", "arrows-v", "asl-interpreting", "assistive-listening-systems", "asterisk", "at", "audio-description", "automobile", "balance-scale", "ban", "bank", "bar-chart", "bar-chart-o", "barcode", "bars", "bath", "bathtub", "battery", "battery-0", "battery-1", "battery-2", "battery-3", "battery-4", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-o", "bell-slash", "bell-slash-o", "bicycle", "binoculars", "birthday-cake", "blind", "bluetooth", "bluetooth-b", "bolt", "bomb", "book", "bookmark", "bookmark-o", "braille", "briefcase", "bug", "building", "building-o", "bullhorn", "bullseye", "bus", "cab", "calculator", "calendar", "calendar-check-o", "calendar-minus-o", "calendar-o", "calendar-plus-o", "calendar-times-o", "camera", "camera-retro", "car", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "cart-arrow-down", "cart-plus", "cc", "certificate", "check", "check-circle", "check-circle-o", "check-square", "check-square-o", "child", "circle", "circle-o", "circle-o-notch", "circle-thin", "clock-o", "clone", "close", "cloud", "cloud-download", "cloud-upload", "code", "code-fork", "coffee", "cog", "cogs", "comment", "comment-o", "commenting", "commenting-o", "comments", "comments-o", "compass", "copyright", "creative-commons", "credit-card", "credit-card-alt", "crop", "crosshairs", "cube", "cubes", "cutlery", "dashboard", "database", "deaf", "deafness", "desktop", "diamond", "dot-circle-o", "download", "drivers-license", "drivers-license-o", "edit", "ellipsis-h", "ellipsis-v", "envelope", "envelope-o", "envelope-open", "envelope-open-o", "envelope-square", "eraser", "exchange", "exclamation", "exclamation-circle", "exclamation-triangle", "external-link", "external-link-square", "eye", "eye-slash", "eyedropper", "fax", "feed", "female", "fighter-jet", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o", "file-pdf-o", "file-photo-o", "file-picture-o", "file-powerpoint-o", "file-sound-o", "file-video-o", "file-word-o", "file-zip-o", "film", "filter", "fire", "fire-extinguisher", "flag", "flag-checkered", "flag-o", "flash", "flask", "folder", "folder-o", "folder-open", "folder-open-o", "frown-o", "futbol-o", "gamepad", "gavel", "gear", "gears", "gift", "glass", "globe", "graduation-cap", "group", "hand-grab-o", "hand-lizard-o", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o", "handshake-o", "hard-of-hearing", "hashtag", "hdd-o", "headphones", "heart", "heart-o", "heartbeat", "history", "home", "hotel", "hourglass", "hourglass-1", "hourglass-2", "hourglass-3", "hourglass-end", "hourglass-half", "hourglass-o", "hourglass-start", "i-cursor", "id-badge", "id-card", "id-card-o", "image", "inbox", "industry", "info", "info-circle", "institution", "key", "keyboard-o", "language", "laptop", "leaf", "legal", "lemon-o", "level-down", "level-up", "life-bouy", "life-buoy", "life-ring", "life-saver", "lightbulb-o", "line-chart", "location-arrow", "lock", "low-vision", "magic", "magnet", "mail-forward", "mail-reply", "mail-reply-all", "male", "map", "map-marker", "map-o", "map-pin", "map-signs", "meh-o", "microchip", "microphone", "microphone-slash", "minus", "minus-circle", "minus-square", "minus-square-o", "mobile", "mobile-phone", "money", "moon-o", "mortar-board", "motorcycle", "mouse-pointer", "music", "navicon", "newspaper-o", "object-group", "object-ungroup", "paint-brush", "paper-plane", "paper-plane-o", "paw", "pencil", "pencil-square", "pencil-square-o", "percent", "phone", "phone-square", "photo", "picture-o", "pie-chart", "plane", "plug", "plus", "plus-circle", "plus-square", "plus-square-o", "podcast", "power-off", "print", "puzzle-piece", "qrcode", "question", "question-circle", "question-circle-o", "quote-left", "quote-right", "random", "recycle", "refresh", "registered", "remove", "reorder", "reply", "reply-all", "retweet", "road", "rocket", "rss", "rss-square", "s15", "search", "search-minus", "search-plus", "send", "send-o", "server", "share", "share-alt", "share-alt-square", "share-square", "share-square-o", "shield", "ship", "shopping-bag", "shopping-basket", "shopping-cart", "shower", "sign-in", "sign-language", "sign-out", "signal", "signing", "sitemap", "sliders", "smile-o", "snowflake-o", "soccer-ball-o", "sort", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-asc", "sort-desc", "sort-down", "sort-numeric-asc", "sort-numeric-desc", "sort-up", "space-shuttle", "spinner", "spoon", "square", "square-o", "star", "star-half", "star-half-empty", "star-half-full", "star-half-o", "star-o", "sticky-note", "sticky-note-o", "street-view", "suitcase", "sun-o", "support", "tablet", "tachometer", "tag", "tags", "tasks", "taxi", "television", "terminal", "thermometer", "thermometer-0", "thermometer-1", "thermometer-2", "thermometer-3", "thermometer-4", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "thumb-tack", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up", "ticket", "times", "times-circle", "times-circle-o", "times-rectangle", "times-rectangle-o", "tint", "toggle-down", "toggle-left", "toggle-off", "toggle-on", "toggle-right", "toggle-up", "trademark", "trash", "trash-o", "tree", "trophy", "truck", "tty", "tv", "umbrella", "universal-access", "university", "unlock", "unlock-alt", "unsorted", "upload", "user", "user-circle", "user-circle-o", "user-o", "user-plus", "user-secret", "user-times", "users", "vcard", "vcard-o", "video-camera", "volume-control-phone", "volume-down", "volume-off", "volume-up", "warning", "wheelchair", "wheelchair-alt", "wifi", "window-close", "window-close-o", "window-maximize", "window-minimize", "window-restore", "wrench", "american-sign-language-interpreting", "asl-interpreting", "assistive-listening-systems", "audio-description", "blind", "braille", "cc", "deaf", "deafness", "hard-of-hearing", "low-vision", "question-circle-o", "sign-language", "signing", "tty", "universal-access", "volume-control-phone", "wheelchair", "wheelchair-alt", "hand-grab-o", "hand-lizard-o", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up", "ambulance", "automobile", "bicycle", "bus", "cab", "car", "fighter-jet", "motorcycle", "plane", "rocket", "ship", "space-shuttle", "subway", "taxi", "train", "truck", "wheelchair", "wheelchair-alt", "genderless", "intersex", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "mercury", "neuter", "transgender", "transgender-alt", "venus", "venus-double", "venus-mars", "file", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o", "file-o", "file-pdf-o", "file-photo-o", "file-picture-o", "file-powerpoint-o", "file-sound-o", "file-text", "file-text-o", "file-video-o", "file-word-o", "file-zip-o", "circle-o-notch", "cog", "gear", "refresh", "spinner", "check-square", "check-square-o", "circle", "circle-o", "dot-circle-o", "minus-square", "minus-square-o", "plus-square", "plus-square-o", "square", "square-o", "cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "credit-card", "credit-card-alt", "google-wallet", "paypal", "area-chart", "bar-chart", "bar-chart-o", "line-chart", "pie-chart", "bitcoin", "btc", "cny", "dollar", "eur", "euro", "gbp", "gg", "gg-circle", "ils", "inr", "jpy", "krw", "money", "rmb", "rouble", "rub", "ruble", "rupee", "shekel", "sheqel", "try", "turkish-lira", "usd", "won", "yen", "align-center", "align-justify", "align-left", "align-right", "bold", "chain", "chain-broken", "clipboard", "columns", "copy", "cut", "dedent", "eraser", "file", "file-o", "file-text", "file-text-o", "files-o", "floppy-o", "font", "header", "indent", "italic", "link", "list", "list-alt", "list-ol", "list-ul", "outdent", "paperclip", "paragraph", "paste", "repeat", "rotate-left", "rotate-right", "save", "scissors", "strikethrough", "subscript", "superscript", "table", "text-height", "text-width", "th", "th-large", "th-list", "underline", "undo", "unlink", "angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "arrow-circle-down", "arrow-circle-left", "arrow-circle-o-down", "arrow-circle-o-left", "arrow-circle-o-right", "arrow-circle-o-up", "arrow-circle-right", "arrow-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "arrows", "arrows-alt", "arrows-h", "arrows-v", "caret-down", "caret-left", "caret-right", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "caret-up", "chevron-circle-down", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "exchange", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "long-arrow-down", "long-arrow-left", "long-arrow-right", "long-arrow-up", "toggle-down", "toggle-left", "toggle-right", "toggle-up", "arrows-alt", "backward", "compress", "eject", "expand", "fast-backward", "fast-forward", "forward", "pause", "pause-circle", "pause-circle-o", "play", "play-circle", "play-circle-o", "random", "step-backward", "step-forward", "stop", "stop-circle", "stop-circle-o", "youtube-play", "500px", "adn", "amazon", "android", "angellist", "apple", "bandcamp", "behance", "behance-square", "bitbucket", "bitbucket-square", "bitcoin", "black-tie", "bluetooth", "bluetooth-b", "btc", "buysellads", "cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "chrome", "codepen", "codiepie", "connectdevelop", "contao", "css3", "dashcube", "delicious", "deviantart", "digg", "dribbble", "dropbox", "drupal", "edge", "eercast", "empire", "envira", "etsy", "expeditedssl", "fa", "facebook", "facebook-f", "facebook-official", "facebook-square", "firefox", "first-order", "flickr", "font-awesome", "fonticons", "fort-awesome", "forumbee", "foursquare", "free-code-camp", "ge", "get-pocket", "gg", "gg-circle", "git", "git-square", "github", "github-alt", "github-square", "gitlab", "gittip", "glide", "glide-g", "google", "google-plus", "google-plus-circle", "google-plus-official", "google-plus-square", "google-wallet", "gratipay", "grav", "hacker-news", "houzz", "html5", "imdb", "instagram", "internet-explorer", "ioxhost", "joomla", "jsfiddle", "lastfm", "lastfm-square", "leanpub", "linkedin", "linkedin-square", "linode", "linux", "maxcdn", "meanpath", "medium", "meetup", "mixcloud", "modx", "odnoklassniki", "odnoklassniki-square", "opencart", "openid", "opera", "optin-monster", "pagelines", "paypal", "pied-piper", "pied-piper-alt", "pied-piper-pp", "pinterest", "pinterest-p", "pinterest-square", "product-hunt", "qq", "quora", "ra", "ravelry", "rebel", "reddit", "reddit-alien", "reddit-square", "renren", "resistance", "safari", "scribd", "sellsy", "share-alt", "share-alt-square", "shirtsinbulk", "simplybuilt", "skyatlas", "skype", "slack", "slideshare", "snapchat", "snapchat-ghost", "snapchat-square", "soundcloud", "spotify", "stack-exchange", "stack-overflow", "steam", "steam-square", "stumbleupon", "stumbleupon-circle", "superpowers", "telegram", "tencent-weibo", "themeisle", "trello", "tripadvisor", "tumblr", "tumblr-square", "twitch", "twitter", "twitter-square", "usb", "viacoin", "viadeo", "viadeo-square", "vimeo", "vimeo-square", "vine", "vk", "wechat", "weibo", "weixin", "whatsapp", "wikipedia-w", "windows", "wordpress", "wpbeginner", "wpexplorer", "wpforms", "xing", "xing-square", "y-combinator", "y-combinator-square", "yahoo", "yc", "yc-square", "yelp", "yoast", "youtube", "youtube-play", "youtube-square", "ambulance", "h-square", "heart", "heart-o", "heartbeat", "hospital-o", "medkit", "plus-square", "stethoscope", "user-md", "wheelchair", "wheelchair-alt"];
			fontawesome.forEach(function (i) {
				$('#icons').append('<div class="col-xs-6 col-sm-4 col-lg-3 p-1"><i class="fa fa-fw fa-' + i + '"></i> ' + i + '</div>');
			});
		},
		validation: function validation() {
			$('#demo-form-validation').submit(function (e) {
				e.preventDefault();
				setTimeout(function () {
					swal('Good job!', 'Your form has been submitted successfully!', 'success');
				}, 5000);
				location.reload();
				return false;
			});
		},
		search: function search() {
			if ($('#results').length > 0 ) {
				$.ajax('/api/staff/10', {
					success: function success(data) {
						data.forEach(function (item) {
							// console.log(item);
							$('#results').append(`
								<div class="col-md-3">
								    <div class="card">
								        <img class="card-img-top img-fluid" src="${item.photo}" alt="Photo">
								        <div class="card-block">
								            <h4 class="card-title text-truncate">${item.first_name} ${item.last_name}</h4>
								            <p class="card-text">${item.department}</p><p class="card-text">${item.phone}</p>
								            <p class="card-text">${item.email}</p>
								        </div>
								    </div>
								</div>
								`);
						});
					},
					error: function error() {
						swal('Error', 'Cannot retrieve sample data.', 'error');
					}
				});
			}
		},
		maps: function(){
			$("#map1").googleMap({
		      	zoom: 10, 
		      	coords: [42.365515, -71.122141], 
		      	type: "ROADMAP"
		    });
		    $("#map2").googleMap({
		      	zoom: 10, 
		      	coords: [42.365515, -71.122141], 
		      	type: "SATELLITE"
		    });
		    $("#map3").googleMap({
		      	zoom: 10, 
		      	coords: [42.365515, -71.122141], 
		      	type: "HYBRID"
		    });
		    $("#map4").googleMap({
		      	zoom: 10, 
		      	coords: [42.365515, -71.122141], 
		      	type: "TERRAIN"
		    });

		    $("#map5").googleMap();
		    $("#map5").addMarker({
		      	coords: [42.365515, -71.122141],
		      	icon: '/images/branding/hbs-shield.svg', 
		      	url: 'http://www.hbs.edu'
		    });

		    $("#map6").googleMap();
		    $("#map6").addMarker({
		      	coords: [42.365515, -71.122141], 
		      	title: '<h4>Harvard Business School<h4>', 
		      	text:  'test'
		    });


		    $("#map7").googleMap();
		    $("#map7").addMarker({
		    	 coords: [42.366704, -71.126751]
		    });
		    $("#map7").addMarker({
		    	 coords: [42.362712, -71.128981]
		    });
		    $("#map7").addMarker({
		        coords: [42.364077, -71.124182]
		    });
  
		    $("#map8").googleMap();
		    $("#map8").addWay({
		    	start: "25 Travis St. Allston, MA",
				end:  [42.374393, -71.116257],
				route : 'way',
				langage : 'english' 
			});

		},
		dataTablesDemo: function(){
			


		},
		calendarDemo: function() {
			if ( $('.full-calendar').length > 0 ) {

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
								$('#event-modal .modal-body .month').html(moment(event.start).format("MMM"));
								$('#event-modal .modal-body .day').html(moment(event.start).format("DD"));
								$('#event-modal .modal-body .year').html(moment(event.start).format("YYYY"));
								$('#event-modal #event-url').attr('href', event.url);
								$('#event-modal').modal();
							}
						});


						data.forEach(function (event) {
							//console.log(item);
							$('#event-listing-demo').append(`
						        <div class="row">
						            <div class="col-xs-1 event">
						                <div class="month">${moment(event.start).format("MMM")}</div>
						                <div class="day">${moment(event.start).format("DD")}</div>
						                <div class="year">${moment(event.start).format("YYYY")}</div>
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
			
			}
		},
		last: ''
	};
	$(document).ready(AWSFrameworkDemo.ondomready);
	window.AWSFrameworkDemo = AWSFrameworkDemo;
})(jQuery, window);