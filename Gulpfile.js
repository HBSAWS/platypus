var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),  
    notify = require('gulp-notify'),  
    rename = require('gulp-rename'),  
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),  
    cleanCSS = require('gulp-clean-css'),
    nightwatch = require('gulp-nightwatch'),
    banner = require('gulp-banner'),
    gutil = require('gulp-load-utils')(['env', 'date', 'colors']);

var opts = {
    destCDN: ( process.platform === 'darwin' ) ? '/Volumes/nas-prd/prod_webfarm/htdocs/securelib/static/libs/platypus/0.2' : '\\\\nas-prd\\prod_webfarm\\htdocs\\securelib\\static\\libs\\platypus\\0.2',
    dist: './public/dist',
    jsFiles : [
        'public/vendor/jquery/jquery.min.js',
        'public/vendor/tether/tether.min.js',
        'public/vendor/bootstrap/bootstrap.min.js',
        'public/vendor/jasny-bootstrap/jasny-bootstrap.min.js',
        'public/vendor/moment/moment-with-locales.min.js',
        'public/vendor/conditionize/conditionize.js',
        'public/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js',
        'public/vendor/bootstrap-slider/bootstrap-slider.min.js',
        'public/vendor/bootstrap-toggle/bootstrap-toggle.min.js',
        'public/vendor/parsley/parsley.min.js',
        'public/vendor/metisMenu/metisMenu.min.js',
        'public/vendor/slick/slick.min.js',
        'public/vendor/es6-promise/es6-promise.auto.min.js',
        'public/vendor/sweetalert2/sweetalert2.min.js',
        'public/vendor/dataTables/jquery.dataTables.min.js',
        'public/vendor/dataTables/dataTables.bootstrap4.min.js',
        'public/vendor/dataTables/dataTables.responsive.min.js',
        'public/vendor/lodash/lodash.min.js',
        'public/vendor/waves/waves.min.js',
        'public/vendor/summernote/summernote.js', 
        'public/vendor/bootstrap-maxlength/bootstrap-maxlength.min.js', 
        'public/vendor/spin/spin.js', 
        'public/vendor/spin/jquery.spin.js', 
        'public/vendor/ladda-bootstrap/ladda.min.js', 
        'public/vendor/select2/select2.min.js', 
        'public/vendor/daterangepicker/daterangepicker.js',
        'public/vendor/jquery.knob/jquery.knob.min.js',
        'public/vendor/fuelux/fuelux.min.js',
        'public/vendor/toastr/toastr.min.js',
        'public/vendor/slimScroll/jquery.slimscroll.min.js',
        'public/vendor/blueimp/jquery.blueimp-gallery.min.js',
        'public/vendor/fullcalendar/fullcalendar.min.js',
        'public/vendor/jquery-asBreadcrumbs/jquery-asBreadcrumbs.min.js',
        'public/vendor/jquery.listnav/jquery.listnav.min-2.1.js',
        'public/vendor/jquery-typeahead/jquery.typeahead.min.js',
        'public/vendor/highlight/highlight.min.js',
        'public/vendor/strength/strength.min.js',
        'public/vendor/jquery-flip/jquery-flip.min.js',
        'public/vendor/bootstrap-rating/bootstrap-rating.min.js',
        'public/vendor/d3/d3.v3.min.js',
        'public/vendor/c3/c3.min.js',
        'public/js/main.js',
    ], 
    cssFiles : [
        'public/vendor/bootstrap/bootstrap.min.css',
        'public/vendor/jasny-bootstrap/jasny-bootstrap.min.css',
        'public/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css',
        'public/vendor/bootstrap-slider/bootstrap-slider.min.css',
        'public/vendor/bootstrap-toggle/bootstrap-toggle.min.css',
        'public/vendor/metisMenu/metisMenu.min.css',
        'public/vendor/slick/slick.css',
        'public/vendor/slick/slick-theme.css',
        'public/vendor/dataTables/dataTables.bootstrap.min.css',
        'public/vendor/dataTables/dataTables.bootstrap4.min.css',
        'public/vendor/dataTables/responsive.dataTables.min.css',
        'public/vendor/sweetalert2/sweetalert2.min.css',
        'public/vendor/summernote/summernote.css', 
        'public/vendor/waves/waves.min.css',
        'public/vendor/ladda-bootstrap/ladda.min.css',
        'public/vendor/select2/select2.min.css',
        'public/vendor/select2/select2-bootstrap.min.css',
        'public/vendor/daterangepicker/daterangepicker.css',
        'public/vendor/fuelux/fuelux.min.css',
        'public/vendor/toastr/toastr.min.css',
        'public/vendor/blueimp/blueimp-gallery.min.css',
        'public/vendor/fullcalendar/fullcalendar.min.css',
        'public/vendor/fullcalendar/fullcalendar.print.css',
        'public/vendor/jquery-typeahead/jquery.typeahead.min.css',
        'public/vendor/c3/c3.min.css',
        'public/vendor/strength/strength.css',
        'public/css/styles.css',
    ],
    banner: `\n/*! <%= date %> */\n`,
    dt: gutil.date('yyyy-mm-dd h:MM:ss TT Z'),
}

gulp.task('js', function() {  
    return gulp.src(opts.jsFiles)
        .pipe(concat('platypus.js'))
        .pipe(gulp.dest(opts.dist))
        .pipe(rename('platypus.min.js'))
        .pipe(uglify({
            preserveComments: false
        }))
        .pipe(banner(opts.banner, {date: opts.dt}))
        .pipe(gulp.dest(opts.dist))
        //.pipe(livereload());  // this works but not ideal
});

gulp.task('css', function() {  
    return gulp.src(opts.cssFiles)
        .pipe(concat('platypus.css'))
        .pipe(gulp.dest(opts.dist))
        .pipe(rename('platypus.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(banner(opts.banner, {date: opts.dt}))        
        .pipe(gulp.dest(opts.dist));
});

gulp.task('styles', function() {
    gulp.src('sass/**/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
});

gulp.task('transpile', function() {
    return gulp.src('public/js/src/*.js')
    .pipe(babel())
    .pipe(gulp.dest("public/js"));
});

gulp.task('copy:cdn', function () {
    var stream = gulp.src([
            opts.dist + '/*.js', 
            opts.dist + '/*.css'
        ])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(gulp.dest( opts.destCDN ));
    return stream;
});

gulp.task('deploy:cdn', ['copy:cdn'], function () {
    gulp.start('copy:cdn');
});

// Test Tasks
gulp.task('nightwatch:chrome', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.js',
        cliArgs: [ '--env chrome' ]
    }));
});

gulp.task('nightwatch:safari', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.js',
        cliArgs: [ '--env safari' ]
    }));
});

gulp.task('nightwatch:ie', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.js',
        cliArgs: [ '--env ie' ]
    }));
});

gulp.task('refresh', function(){
  return gulp.src('server.js')
    .pipe(livereload());
});

//Watch task
gulp.task('default',function() {

    livereload.listen();

    var log = function(event) {console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');}

    gulp.watch([
        'sass/**/*.scss',
        'public/js/src/*.js',
        'views/**/*.hbs'
    ], function() {
        runSequence('styles','transpile', 'css', 'js');
    }).on('change',log);

    nodemon({
        script: 'server.js', 
        ext: 'js html hbs', 
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() {
        // console.log('\033[2J');
        gulp.start('refresh');
    });
});

var reportError = function(error) {
    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: (error.lineNumber) ? 'LINE ' + error.lineNumber : '',
        sound: 'Sosumi'
    }).write(error);

    var report = '';
    var chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    this.emit('end'); // Prevent the 'watch' task from stopping on error
}
