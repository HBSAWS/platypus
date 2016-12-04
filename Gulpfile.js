var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');  


var jsFiles = [
        'vendor/jquery-3.1.1.min.js',
        'vendor/tether-1.3.7.min.js',
        'vendor/bootstrap-4.0.0-alpha.5.min.js',
        'vendor/metisMenu-2.6.0.min.js',
        'vendor/waves-0.7.5.min.js',
        'vendor/jasny-bootstrap-3.1.3.min.js',
        'vendor/summernote-0.8.1.min.js',
    ],  
    jsDest = 'public/dist';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function() {
    gulp.src('sass/**/app.scss')
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