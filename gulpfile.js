var gulp = require('gulp'),
    pug  = require('gulp-pug'),
    sass = require('gulp-sass'),
    ts   = require('gulp-typescript')

var tsProject = ts.createProject('tsconfig.json')
var path = {
    assets:  ['app/assets/**/*'],
    views:   ['app/views/**/*.pug', '!app/views/**/_*.pug'],
    scss:    ['app/scss/launcher.scss'],
    scripts: ['app/src/**/*.ts']
}

gulp.task('assets', function() {
    return gulp.src(path.assets)
        .pipe(gulp.dest('./dist/assets'))
})

gulp.task('views', function () {
    return gulp.src(path.views)
        .pipe(pug())
        .pipe(gulp.dest('./dist'))
})

gulp.task('scss', function () {
    return gulp.src(path.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('compile', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('build', ['assets', 'views', 'scss', 'compile'])

gulp.task('watch', ['build'], function() {
    gulp.watch(path.assets,          ['assets'])
    gulp.watch(path.views,           ['views'])
    gulp.watch('app/scss/**/*.scss', ['scss'])
    gulp.watch(path.scripts,         ['compile'])
})
