const fs = require('fs');
const chalk = require('chalk');

getFilesizeInBytesAndPrint = function (filePath) {
    var stats = fs.statSync(filePath)
    var fileSizeInBytes = stats["size"];
    console.log(chalk.green('CREATE'), `${process.cwd()}\\${filePath} (${fileSizeInBytes} bytes)`);
}

exports.directive = (path) => {

    let splittedArray = path.split('\\');
    let fileName = splittedArray[splittedArray.length - 1];
    let filePath = `${path}.directive.js`;

    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(`${filePath}`,
                `app.directive( '${fileName}', function() {
    return {
                    scope: {},
                    template:"",
                    link: function(scope, element, attr){
                    
                    }
    }
});`
            );
            getFilesizeInBytesAndPrint(filePath);
        } catch (err) {
            console.log(chalk.red('ERROR:'), `create of ${filePath}:`, err);
        }
    } else {
        console.log(chalk.red('ERROR:'), `${process.cwd()}\\${filePath} already exists`);
    }
}

exports.controller = (path) => {

    let splittedArray = path.split('\\');
    let fileName = splittedArray[splittedArray.length - 1];
    let filePath = `${path}.controller.js`;

    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(`${filePath}`,
                `app.controller('${fileName}', ['$scope',function($scope){
        
}]);`
            );
            getFilesizeInBytesAndPrint(filePath);
        } catch (err) {
            console.log(chalk.red('ERROR:'), `create of ${filePath}:`, err);
        }
    } else {
        console.log(chalk.red('ERROR:'), `${process.cwd()}\\${filePath} already exists`);
    }
}

exports.factory = (path) => {

    let splittedArray = path.split('\\');
    let fileName = splittedArray[splittedArray.length - 1];
    let filePath = `${path}.factory.js`;

    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(`${filePath}`,
                `app.factory('${fileName}', function(){
                    return {
                                    
                    }
    });`);
            getFilesizeInBytesAndPrint(filePath);
        } catch (err) {
            console.log(chalk.red('ERROR:'), `create of ${filePath}:`, err);
        }
    } else {
        console.log(chalk.red('ERROR:'), `${process.cwd()}\\${filePath} already exists`);
    }

}

exports.service = (path) => {

    let splittedArray = path.split('\\');
    let fileName = splittedArray[splittedArray.length - 1];
    let filePath = `${path}.service.js`;

    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(`${filePath}`,
                `app.service('${fileName}', function() {
                this.get = function(){
                
                }
});`)
            getFilesizeInBytesAndPrint(filePath);
        } catch (err) {
            console.log(chalk.red('ERROR:'), `create of ${filePath}:`, err);
        }
    } else {
        console.log(chalk.red('ERROR:'), `${process.cwd()}\\${filePath} already exists`);
    }
}

// exports.view = (path) => {

//     const spawn = require('child_process').spawn;

//     const command = spawn('html.cmd', [`${path}`], {
//         cwd: `${process.cwd()}/${name}`,
//         stdio: "inherit"
//     });

//     command.on('close', _ => {
//     });

//     command.on('error', err => {
//     });

// }

exports.createApp = (name) => {
    let fileName = `${name}\\app.js`;
    try {
        fs.writeFileSync(fileName,
            `var app = angular.module("${name}", []); 
        `);
        getFilesizeInBytesAndPrint(fileName);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${fileName}`, err);
    }
}

exports.createIndex = (name) => {
    let fileName = `${name}\\index.html`;
    try {
        fs.writeFileSync(fileName,
            `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${name}</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/angular.min.js"></script>
    <script src="app.js"></script>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico">
    <!-- please do not remove these comments-->
    <!-- inject:css -->
    <!-- endinject -->
</head>


<body>
    <div ng-app="${name}">
        <h2 class="text-center mt-5">AngularJS Application</h2>
        <h5 class="text-center">Welcome ${name}!!!</h5>
        <img src="assets/img/angular-icon.svg" alt="angular-icon" class="center">
        <h6 class="text-center mt-3">AngularJS Documentation : <a
                href="https://docs.angularjs.org/guide">https://docs.angularjs.org/guide</a></h6>
    </div>
    <!-- please do not remove these comments-->
    <!-- inject:js -->
    <!-- endinject -->
</body>

</html>`);
        getFilesizeInBytesAndPrint(fileName);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${fileName}`, err);
    }
};

exports.createFile = (location, name) => {
    const filePath = `${location}\\${name}`;
    try {
        const file = fs.readFileSync(`${__dirname}/files/${name}`);
        fs.writeFileSync(filePath, file);
        getFilesizeInBytesAndPrint(filePath);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${filePath}`, err);
    }
}

exports.createReadMe = (name) => {
    const filePath = `${name}\\README.md`;
    try {
        fs.writeFileSync(filePath,
            `# ${name}

This project was generated with [AngularJS CLI] version 1.0.0.

## Development server

Run "angularjs-cli serve" for a dev server. Navigate to "http://localhost:4200/".

## Code scaffolding

Run "angularjs-cli generate controller controller-name" to generate a new controller. You can also use "angularjs-cli generate directive | factory | service | controller"..

## Build

Run "angularjs-cli build" to build the project. The build artifacts will be stored in the "dist/" directory.

## Further help

To get more help on the AngularJS CLI use "angularjs-cli --help"
`);
        getFilesizeInBytesAndPrint(filePath);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${filePath}`, err);
    }
}

exports.createPackageJson = (name, answer) => {

    const filePath = `${name}\\package.json`;

    const packages = {
        "browser-sync": "^2.26.7",
        "gulp": "^4.0.2",
        "gulp-sass": "^4.0.2",
        "@babel/core": "^7.6.0",
        "@babel/preset-env": "^7.6.0",
        "gulp-autoprefixer": "^7.0.0",
        "gulp-babel": "^8.0.0",
        "gulp-concat": "^2.6.1",
        "gulp-htmlmin": "^5.0.1",
        "gulp-imagemin": "^6.1.0",
        "gulp-jsonminify": "^1.1.0",
        "gulp-rename": "^1.4.0",
        "gulp-uglify": "^3.0.2",
        "gulp-clean": "^0.4.0",
        "gulp-concat": "^2.6.1",
        "gulp-inject": "^5.0.4"
    };

    if (answer.bootstrap.toLowerCase() === 'y' || answer.bootstrap.toLowerCase() === 'yes') {
        packages['bootstrap'] = 'latest';
    }

    if (answer.jquery.toLowerCase() === 'y' || answer.jquery.toLowerCase() === 'yes') {
        packages['jquery'] = 'latest';
    }

    try {
        fs.writeFileSync(filePath,
            `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "${name}",
    "main": "app.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": ${JSON.stringify(packages, null, 8)}
}`);
        getFilesizeInBytesAndPrint(filePath);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${filePath}`, err);
    }
}

exports.createAngularJSJson = (name, answer) => {

    const filePath = `${name}\\angularjs.json`;

    const configJson = {
        "name": `${name}`,
        "styles": [],
        "scripts": [],
        "outputPath": `dist/${name}`,
        "server": {
            "port": 4200,
            "open": false
        }
    }

    if (answer.jquery.toLowerCase() === 'y' || answer.jquery.toLowerCase() === 'yes') {
        configJson['scripts'].push('node_modules/jquery/dist/jquery.min.js');
    }

    if (answer.bootstrap.toLowerCase() === 'y' || answer.bootstrap.toLowerCase() === 'yes') {
        configJson['scripts'].push('node_modules/bootstrap/dist/js/bootstrap.min.js');
        configJson['styles'].push('node_modules/bootstrap/dist/css/bootstrap.min.css');
    }

    try {
        fs.writeFileSync(filePath,
            `${JSON.stringify(configJson, null, 2)}`);
        getFilesizeInBytesAndPrint(filePath);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${filePath}`, err);
    }

}

exports.createGulpFile = (name) => {

    const filePath = `${name}\\gulpfile.js`;

    try {
        fs.writeFileSync(filePath,
            `const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const jsonminify = require("gulp-jsonminify");
const clean = require("gulp-clean");
const inject = require("gulp-inject");
const concat = require("gulp-concat");
let appConfiguration = require('./angularjs.json');

let paths = {
    styles: {
        src: ["assets/**/*.css", "assets/**/*.scss"],
        dest: appConfiguration.outputPath + "/assets"
    },
    scripts: {
        src: ["**/*.js", "!node_modules/**", "!gulpfile.js", "!" + appConfiguration.outputPath + "/**"],
        dest: appConfiguration.outputPath
    },
    views: {
        src: ["**/*.html", "!node_modules/**", "!" + appConfiguration.outputPath + "/**", "!index.html"],
        dest: appConfiguration.outputPath,
    },
    json: {
        src: ["app/**/*.json"],
        dest: appConfiguration.outputPath + "/app"
    },
    image: {
        src: ["assets/img/**/*"],
        dest: appConfiguration.outputPath + "/assets/img"
    }
};

const browserSync = require("browser-sync").create();

function style() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: "compressed",
        }))
        .on("error", console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src(paths.views.src)
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .on("error", console.error.bind(console))
        .pipe(gulp.dest(paths.views.dest))
        .pipe(browserSync.stream());
}

function image() {
    return gulp.src(paths.image.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.image.dest))
}

function json() {
    return gulp.src(paths.json.src)
        .pipe(jsonminify())
        .pipe(gulp.dest(paths.json.dest));
}

function clean_dist() {
    return gulp.src(appConfiguration.outputPath.split("/")[0], { read: false, allowEmpty: true })
        .pipe(clean());
}

function concatscripts() {
    return gulp.src(appConfiguration.scripts)
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest(paths.scripts.dest));
}

function concatstyles() {
    return gulp.src(appConfiguration.styles)
        .pipe(concat("styles.min.css"))
        .pipe(gulp.dest(paths.views.dest));
}

function index() {
    let target = gulp.src("index.html");
    let sources = gulp.src([appConfiguration.outputPath + "/styles.min.css", appConfiguration.outputPath + "/scripts.min.js"], { read: false });
    return target.pipe(inject(sources, {
        transform: function (filepath) {
            if (filepath.slice(-3) === ".js") {
                return '<script src="' + filepath.substring(filepath.lastIndexOf("/"), filepath.length) + '"></script>';
            }
            if (filepath.slice(-4) === ".css") {
                return '<link rel="stylesheet" href="' + filepath.substring(filepath.lastIndexOf("/"), filepath.length) + '">';
            }
        }
    }))
        .pipe(htmlmin({
            collapseWhitespace: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(appConfiguration.outputPath))
        .pipe(browserSync.stream());
}

function watch_files() {
    browserSync.init({
        server: {
            baseDir: "./" + appConfiguration.outputPath,
        },
        port: appConfiguration.server.port,
        notify: false,
        open: appConfiguration.server.open,
        ui: false
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, js);
    gulp.watch(paths.views.src, html);
    gulp.watch(paths.json.src, json);
    gulp.watch(paths.image.src, image);
    gulp.watch("index.html", gulp.series(concatscripts, concatstyles, index));
}

gulp.task("build", gulp.series(clean_dist, concatscripts, concatstyles, index, gulp.parallel(style, js, html, image, json)))
gulp.task("watch", gulp.series("build", watch_files));`);

        getFilesizeInBytesAndPrint(filePath);
    } catch (err) {
        console.log(`${chalk.red('ERROR')}: create of ${filePath}`, err);
    }
}

