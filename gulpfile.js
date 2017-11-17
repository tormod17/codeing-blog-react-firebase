'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./src/css/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./src/css/'))
})

gulp.task('watch', function () {
  gulp.watch(
    './src/css/index.scss',
    ['sass']);
});

gulp.task('default', ['watch'], function() {
  gulp.start('watch');
});