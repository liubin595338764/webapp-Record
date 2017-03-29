var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    sass = require("gulp-sass");
 
function swallowError(error) {
     // If you want details of the error in the console
    console.error(error.toString());

    this.emit('end');
}
gulp.task('sass', function () {
    gulp.src('src/sass/page/**/*.scss')
    .pipe(sass())
    .on('error', swallowError)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    var watcher = gulp.watch('src/sass/**/*.scss', ['sass']);
    // watcher.on('change', function(event){
    //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    // });

    
});
