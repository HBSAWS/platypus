var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');  
var cleanCSS = require('gulp-clean-css');


var jsFiles = [
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
    'public/vendor/spin/spin.min.js', 
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
jsDest = 'public/js';

console.log(jsFiles);

var cssFiles = [
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
cssDest = 'public/css';    

gulp.task('js', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {  
    return gulp.src(cssFiles)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(rename('app.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('styles', function() {
    gulp.src('sass/**/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    nodemon({
    	script: 'server.js', ext: 'js html hbs', env: { 'NODE_ENV': 'development' }
  });
});
