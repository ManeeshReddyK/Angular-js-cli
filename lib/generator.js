const { controller, directive, factory, service, createApp, createIndex, createFile, createReadMe, createPackageJson, createAngularJSJson, createGulpFile } = require('./templates');
const fs = require('fs');
const chalk = require('chalk');
const { exec } = require('child_process');

exports.generate = (type, path, flag) => {
    let parsedPath;
    switch (type) {
        case 'controller':
        case 'c':
            if (!flag) {
                path = `app/controller/${path}`;
            }
            parsedPath = parsePath(path);
            controller(parsedPath);
            break;
        case 'directive':
        case 'd':
            if (!flag) {
                path = `app/directive/${path}`;
            }
            parsedPath = parsePath(path);
            directive(parsedPath);
            break;
        case 'factory':
        case 'f':
            parsedPath = parsePath(path);
            factory(parsedPath);
            break;
        case 'service':
        case 's':
            if (!flag) {
                path = `app/services/${path}`;
            }
            parsedPath = parsePath(path);
            service(parsedPath);
            break;
        // case 'view':
        // case 'v':
        //     if (!flag) {
        //         path = `app/views/${path}`;
        //     }
        //     parsedPath = parsePath(path);
        //     view(parsedPath);
        //     break;
        default:
            console.log(chalk.red(`Error:`), `operation: ${chalk.blue(type)} is not possible on generate command`);
    }
}

parsePath = (path) => {
    var splittedArray = path.split('/');
    var index = splittedArray.findIndex(element => element.trim() === '');
    var filePath;

    if (index === -1) {

        for (let i = 0; i < splittedArray.length; i++) {

            if (i != 0) {
                filePath = filePath + '\\' + splittedArray[i].trim();
            } else {
                filePath = splittedArray[i].trim()
            }
            if (i === (splittedArray.length - 1)) {
                path = filePath;
                return path;
            } else {
                createDirectory(filePath);
            }

        }
    } else {
        console.log(chalk.red('ERROR:'), `Incorrect Path:${path}`);
        return;
    }

}

exports.newApp = (name, answer) => {
    try {
        createDirectory(name);
        createDirectory(`${name}\\app`);
        createDirectory(`${name}\\app\\controller`);
        createDirectory(`${name}\\app\\directive`);
        createDirectory(`${name}\\app\\views`);
        createDirectory(`${name}\\app\\services`);
        createDirectory(`${name}\\assets`);
        createDirectory(`${name}\\assets\\img`);
        createDirectory(`${name}\\assets\\css`);
        createDirectory(`${name}\\assets\\js`);
        createApp(name);
        createIndex(name);
        createFile(`${name}\\assets\\img`, 'angular-icon.svg');
        createFile(`${name}\\assets\\img`, 'favicon.ico');
        createFile(`${name}\\assets\\css`, 'style.css');
        createFile(`${name}\\assets\\js`, 'angular.min.js');
        createReadMe(name);
        createPackageJson(name, answer);
        createGulpFile(name);
        createAngularJSJson(name, answer);
        gitInitialisation(name, () => {
            if (answer.skipinstall) {
                console.log(chalk.green('SUCCESS'), `Application ${name} has been successfully created`);
            } else {
                installLibraries(name);
            }
        });
    } catch (err) {
        console.log(chalk.red('application creation has failed'));
        console.log(err.message);
    }
}

createDirectory = (name) => {
    if (!fs.existsSync(name)) {
        try {
            fs.mkdirSync(name);
            console.log(chalk.green('CREATE'), `${process.cwd()}\\${name} `);
        } catch (err) {
            throw Error(err);
        }
    }
};

gitInitialisation = (name, cb) => {
    //TODO if git command not found , error is thrown handle that case
    exec(`cd ${name} && git init`, (err, stdout, stderr) => {
        if (err) {
            throw new Error(`${chalk.red('ERROR:')} Git Initialisation failed`)
        } else {
            console.log(chalk.green('CREATE'), `${process.cwd()}\\${name} Git has been Initialised`);
            try {
                fs.writeFileSync(`${name}\\.gitignore`, '/node_modules')
                console.log(chalk.green('CREATE'), `${process.cwd()}\\${name}\\.gitignore`);
                exec(`cd ${name} && git add . && git commit -m "initial commit"`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(`${chalk.red('ERROR:')} Git Initial commit failed`);
                    }
                })
            } catch (err) {
                console.log(`${chalk.red('ERROR:')} ${process.cwd()}\\${name}\\.gitignore failed`);
            } finally {
                cb();
            }
        }
    });
}

installLibraries = (name) => {

    const spawn = require('child_process').spawn;

    console.log(chalk.green('Installing the Packages...'));

    const command = spawn('npm.cmd', ['install'], {
        cwd: `${process.cwd()}/${name}`,
        stdio: "inherit"
    });

    command.on('close', _ => {
    });

    command.on('error', err => {
        console.log(chalk.red('ERROR:'), 'Packages Installation has been Failed');
    });
}

exports.buildApp = () => {
    const spawn = require('child_process').spawn;

    try {
        require(`${process.cwd()}/angularjs.json`);
    } catch (err) {
        console.log(chalk.red('ERROR:'), 'Not found angularjs.json file');
        return;
    }

    try {
        require(`${process.cwd()}/gulpfile.js`);
    } catch (err) {
        console.log(chalk.red('ERROR:'), 'Not found gulpfile.js file');
        return;
    }

    console.log(chalk.green('Building the AngularJS Application...'));

    const command = spawn('gulp.cmd', ['build'], {
        cwd: `${process.cwd()}`,
        stdio: "inherit"
    });

    command.on('close', _ => {
    });

    command.on('error', err => {
        console.log(chalk.red('ERROR:'), 'Building the AngularJS App has been Failed');
    });
}

exports.gulpStartServer = (port, open) => {
    const spawn = require('child_process').spawn;
    let data;
    let serverconfig;

    if (isNaN(port)) {
        console.log(chalk.red(`Error:`, 'Please enter a valid port number'));
        return;
    }

    //to know whether a port is used or not
    portInUse(port, function (returnValue) {
        if (returnValue) {
            console.log(chalk.red(`Port ${port} is already in use. Use '--port' to specify a different port.`));
            return;

        } else {

            try {
                serverconfig = require(`${process.cwd()}/angularjs.json`);
                serverconfig.server = {
                    port: port,
                    open: open
                }
                data = JSON.stringify(serverconfig, null, 4);
                fs.writeFileSync(`${process.cwd()}/angularjs.json`, data);
            } catch (err) {
                let message = err.code === 'MODULE_NOT_FOUND' ? 'Not found angularjs.json file' : 'Error in writing angularjs.json file'
                console.log(chalk.red('ERROR:'), message);
                return;
            }

            try {
                require(`${process.cwd()}/gulpfile.js`);
            } catch (err) {
                console.log(chalk.red('ERROR:'), 'Not found gulpfile.js file');
                return;
            }

            console.log(`** AngularJS Live Development Server is listening on localhost:${port}, open your browser on http://localhost:${port}/ **`);

            const command = spawn('gulp.cmd', ['watch'], {
                cwd: `${process.cwd()}`,
                stdio: "inherit"
            });

            command.on('error', err => {
                console.log(chalk.red('ERROR:'), 'Serves the AngularJS App has been Failed');
            });
        }
    });
}

var net = require('net');

var portInUse = function (port, callback) {
    var server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(port, 'localhost');
    server.on('error', function (e) {
        callback(true);
    });
    server.on('listening', function (e) {
        server.close();
        callback(false);
    });
};

