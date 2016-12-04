var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');  
var cleanCSS = require('gulp-clean-css');


var jsFiles = [
        'vendor/jquery/jquery-3.1.1.min.js',
        'vendor/tether/tether-1.3.7.min.js',
        'vendor/bootstrap/bootstrap-4.0.0-alpha.5.min.js',
        'vendor/metisMenu/metisMenu-2.6.0.min.js',
        'vendor/waves/waves-0.7.5.min.js',
        'vendor/jasny-bootstrap/jasny-bootstrap-3.1.3.min.js',
        'vendor/summernote/summernote-0.8.1.min.js',
        'public/js/main.js',
    ],  
    jsDest = 'public/js';

var cssFiles = [
        'vendor/bootstrap/bootstrap-4.0.0-alpha.5.min.css',
        'vendor/font-awesome/font-awesome-4.7.0.css',
        'vendor/waves/waves-0.7.5.min.css',
        'vendor/jasny-bootstrap/jasny-bootstrap-3.1.3.min.css',
        'vendor/summernote/summernote-0.8.1.min.css',
        'public/css/styles.css',
    ],  
    cssDest = 'public/css';    

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('stylesheets', function() {  
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