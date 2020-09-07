#!/usr/bin/env node
const program = require('commander');
const { generate, newApp, startServer, changePort, buildApp, gulpStartServer } = require('./lib/generator');
const figlet = require('figlet');
const chalk = require('chalk');
const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'bootstrap',
        message: 'Do want you want to include Bootstrap?'
    },
    {
        type: 'input',
        name: 'jquery',
        message: 'Do want you want to include Jquery?'
    }
]

program.on('--help', function () {
    console.log('')
    console.log('Examples:');
    console.log(chalk.yellow('angularjs-cli '), 'generate controller customController');
    console.log(chalk.yellow('angularjs-cli '), 'g c customController');
});

program
    .command('version')
    .alias('v')
    .action(() => {
        figlet('AngularJS CLI', function (err, data) {
            if (err) {
                console.log('AngularJS Command Line Interface');
            }
            else {
                console.log(chalk.red(data));
            }
            console.log(chalk.blue('Version: '), '2.0.0');
            console.log(chalk.blue('Author : '), 'MANISH');
        });
    })
    .description(`Outputs AngularJS CLI Version`);

program
    .command('new <name>')
    .alias('n')
    .option('-si, --skipinstall', 'Skip installation of packages', false)
    .action((name, cmdObj) => {
        prompt(questions).then(answer => {
            answer.skipinstall = cmdObj.skipinstall;
            newApp(name, answer);
        })
    })
    .description('Creates a new workspace and an initial AngularJS application.');

program
    .command('generate <type> <name>')
    .alias('g')
    .option('-f, --flag', 'Flag', false)
    .description('Generates and/or modifies files based on a schematic')
    .action((type, name, cmdObj) => {
        generate(type, name, cmdObj.flag);
    });

program
    .command('serve')
    .alias('s')
    .description('Builds and serves your app.')
    .option('-o, --open', 'Opens the url in default browser.', false)
    .option('-p, --port <port>', 'Port to listen on.', 4200)
    .action((cmdObj) => {
        gulpStartServer(cmdObj.port, cmdObj.open);
    });

program
    .command('build')
    .alias('b')
    .description('Builds and Optimizes your app.')
    .action(() => {
        buildApp();
    });

program
    .on('command:*', function (command) {
        const firstCommand = command[0];
        if (!this.commands.find(c => c._name == firstCommand)) {
            console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
            process.exit(1);
        }
    })

program.parse(process.argv);



