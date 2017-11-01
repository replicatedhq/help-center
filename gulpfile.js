var gulp = require("gulp"),
    rev = require("gulp-rev"),
    path = require("path");

gulp.task('default', () =>
gulp.src('themes/replicated-docs-theme/static/css/style.css', {base: path.join(process.cwd(), 'themes/replicated-docs-theme/static/css')})
    .pipe(rev())
    .pipe(gulp.dest('static/css'))  // write rev'd assets to build dir
    .pipe(rev.manifest(('manifest.json')))
    .pipe(gulp.dest('data'))  // write manifest to build dir
);