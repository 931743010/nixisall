var gulp = require('gulp');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

gulp.task('html',function(){
    gulp.src(['index.html','html/**/*.html'])
        .pipe(livereload());
});

//gulp.task('css',function(){
//    gulp.src(['css/common.css','css/**/*.css'])
//        .pipe(livereload());
//});

gulp.task('clean',function(){
    return gulp.src(['dist'])
        .pipe(clean());
});

gulp.task('watch',function(){
    livereload.listen();
    gulp.watch(['index.html','html/**/*.html','css/**/*.css','js/**/*.js'],['html']);
});

gulp.task('build',['clean'],function(){
    gulp.src('css/**/*.css')
        .pipe(autoprefixer({
            browsers : ['> 1%'],
            cascade  : true
        }))
        .pipe(concat('grandLine.css'))
        .pipe(minifyCss({compatibility : 'ie8'}))
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/css'));
    gulp.src('images/**/*.png')
        .pipe(cache(imagemin({
            optimizationLevel:3,
            interlaced : true,
            progressive : true,
            svgoPlugins: [{removeViewBox:false}],
            use : [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});





//gulp.task('autoprefixer',function(){
//    return gulp.src('css/**/*.css')
//        .pipe(autoprefixer({
//            browsers : ['> 1%'],
//            cascade  : true
//        }))
//        .pipe
//        .pipe(rename({suffix:'.min'}))
//        .pipe(gulp.dest('dist'));
//});

//gulp.task('minifyCss',function(){
//    return gulp.src('dist/**/*.css')
//        .pipe(minifyCss({compatibility:'ie8'}))
//        .pipe(gulp.dest('dist'));
//});

