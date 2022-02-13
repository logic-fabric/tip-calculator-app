"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");

function watch() {
  gulp.watch("./css/scss/**/*.scss", buildCSS);
  gulp.watch("./css/main.css", autoprefixCSS);
}

function buildCSS() {
  return gulp
    .src("./css/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./css"));
}

function autoprefixCSS() {
  return gulp
    .src("./css/main.css")
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css/prefixed"));
}

module.exports = {
  watch: watch,
  buildCSS: buildCSS,
  autoprefixCSS: autoprefixCSS,
};
