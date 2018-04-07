const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const wait = require('gulp-wait');

const config = {
    js: {
        src: './src/scripts/js/**/*.js',
        dest: './dist/js/'
    },
    scss: {
        src: './src/scss/main.scss',
        dest: './dist/styles/'
    },
    img: {
        src: './src/img/**',
        dest: './dist/img/'
    }
}

// Static server
gulp.task('browser-sync', () =>
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
);

gulp.task('js', () =>
    gulp.src(config.js.src)
    .pipe(wait(500))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.js.dest))
);

gulp.task('sass', () =>
    gulp.src(config.scss.src)
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(browserSync.stream())
);

gulp.task('img', () => 
    gulp.src(config.img.src)
    .pipe(gulp.dest(config.img.dest))
);

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch(config.img.src, ['img']);
    gulp.watch('./index.html', browserSync.reload);
});

gulp.task('prepare', ['sass', 'js', 'img']);

gulp.task('default', ['prepare', 'watch', 'browser-sync']);