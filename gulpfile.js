'use strict.';

const {src, dest} = require('gulp'),
      gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      browsersync = require('browser-sync').create(),
      del = require('del'),
      autoprefixer = require('gulp-autoPrefixer'),
      media = require('gulp-group-css-media-queries'),
      cleancss = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify-es').default,
      fileinclude = require('gulp-file-include'),
      imagemin = require('gulp-imagemin');

let path = {
    build: {
        html: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        images: "dist/images/",
        fonts: "dist/fonts/"
    },
    src: {
        html: "app/*.pug",
        css: "app/scss/style.scss",
        js: "app/js/*.js",
        images: "app/images/*.{jpg,png,svg,gif,ico,webp}",
        fonts: "app/fonts/*.{woff,woff2}"
    },
    watch: {
        html: "app/**/*.pug",
        css: "app/scss/**/*.scss",
        js: "app/js/*.js",
        images: "app/images/*.{jpg,png,svg,gif,ico,webp}",
        fonts: "app/fonts/*.{woff,woff2}"
    },
    clean: "dist/"
};


function css() {
    return src(path.src.css)
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(media())
        .pipe(autoprefixer({
                overrideBrowserslist:["last 5 versions"],
                cascade: true
            }))
        .pipe(dest("dist/css/"))
        .pipe(cleancss())
        .pipe(rename({extname: ".min.css"}))
        .pipe(dest("dist/css/"))
        .pipe(browsersync.stream());
}

function html(){
    return src(path.src.html)
        .pipe(pug({outputStyle: 'compressed'}))
        .pipe(dest('dist/'))
        .pipe(browsersync.stream());
}
function fonts(){
    return src(path.src.fonts)
        .pipe(dest('dist/fonts/'))
        .pipe(browsersync.stream());
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        // .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images(){
    return src(path.src.images)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]}))
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream());
}

function browserSync(){
    browsersync.init({
        server: {baseDir: "dist/"},
        port: 3000,
        notify: false
    });
}

function watchFile(){
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.images],images);
    gulp.watch([path.watch.fonts],fonts);
}

function clean(){
    return del(path.clean);
}
let build = gulp.series(images,fonts,gulp.parallel(js,css,html));
let watch =  gulp.series(clean,build,gulp.parallel(watchFile,browserSync));

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.fonts = fonts;
exports.images = images;
exports.default = watch;

