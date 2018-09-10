var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
    return gulp.src('src/style.scss')
        .pipe(sass({ outputStyle: 'compressed', includePaths: 'node_modules' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'android 4.4']
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('default',  gulp.series('css'));

gulp.task('watch', gulp.series('css', function () {
    return gulp.watch('src/*', gulp.series('css'));
}));