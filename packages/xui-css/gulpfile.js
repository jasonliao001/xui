const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-cssmin')
const salad = require('postcss-salad')(require('../../salad.config.json'))

gulp.task('compile', function () {
  return gulp.src('./src/*.css')
    // 使用postcss-salad
    .pipe(postcss([salad]))
    // 进行css压缩
    .pipe(cssmin())
    // 输出到 './lib' 目录下
    .pipe(gulp.dest('./lib'))
})

gulp.task('build', ['compile'])
