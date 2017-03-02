var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),  
    notify = require('gulp-notify'),  
    rename = require('gulp-rename'),  
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),  
    cleanCSS = require('gulp-clean-css'),
    nightwatch = require('gulp-nightwatch'),
    gutil = require('gulp-load-utils')(['env', 'date', 'colors']);

var opts = {
    destCDN: ( process.platform === 'darwin' ) ? '/Volumes/prod_webfarm/htdocs/securelib/static/libs/platypus/1.0' : '\\\\nas-prd\\prod_webfarm\\htdocs\\securelib\\static\\libs\\platypus\\1.0',
    dist: './dist',
    jsFiles : [
        'public/vendor/jquery/jquery.min.js',
        'public/vendor/tether/tether.min.js',
        'public/vendor/bootstrap/bootstrap.min.js',
        'public/vendor/jasny-bootstrap/jasny-bootstrap.min.js',
        'public/vendor/moment/moment-with-locales.min.js',
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
        'public/vendor/faker/faker.min.js',
        'public/vendor/highlight/highlight.min.js',
        'public/js/main.js',
    ], 
    cssFiles : [
        'public/vendor/bootstrap/bootstrap.min.css',
        'public/vendor/jasny-bootstrap/jasny-bootstrap.min.css',
        'public/vendor/font-awesome/font-awesome.min.css',
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
        'public/css/styles.css',
    ],
}

gulp.task('js', function() {  
    return gulp.src(opts.jsFiles)
        .pipe(concat('platypus.js'))
        .pipe(gulp.dest(opts.dist))
        .pipe(rename('platypus.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(opts.dist));
});

gulp.task('css', function() {  
    return gulp.src(opts.cssFiles)
        .pipe(concat('platypus.css'))
        .pipe(gulp.dest(opts.dist))
        .pipe(rename('platypus.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
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


gulp.task('nightwatch:chrome', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.BASIC.js',
        cliArgs: [ '--env chrome' ]
    }));
});

gulp.task('nightwatch:safari', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.BASIC.js',
        cliArgs: [ '--env safari' ]
    }));
});

gulp.task('nightwatch:ie', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.BASIC.js',
        cliArgs: [ '--env ie' ]
    }));
});


//Watch task
gulp.task('default',function() {

    var log = function(event) {console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');}

    gulp.watch([
        'sass/**/*.scss',
        'public/js/src/*.js'
    ], function() {
        runSequence('styles','transpile', 'deploy:cdn');
    }).on('change',log);

    nodemon({
        script: 'server.js', 
        ext: 'js html hbs', 
        env: { 'NODE_ENV': 'development' }
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
