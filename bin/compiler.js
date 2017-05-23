#!/usr/bin/env node
/**
 * Created by kelvinsun on 2017/5/24.
 */

const yargs = require("yargs");
const path = require('path');

const args = yargs
    .usage('Usage: $0 <inFile> [<inFile>] <outFile>')
    .option('transformToRequire', {
        describe: 'i don\'t know how to use',
    })
    .option('preserveWhitespace', {
        describe: 'if this option was passed, parsed html content will preserve the white spaces',
    })
    .help();
const argv = args.argv;

var inputPath, outputPath;
var inputName, outputName;

if (!argv['_'][0]) {
    console.error('need input file!');
    return ;
}

inputPath = path.parse(argv['_'][0]);

if ('.vue' !== inputPath.ext) {
    console.error('input file must be an .vue file!');
    return ;
}

inputName = inputPath.base;

if (!argv['_'][1]) {
    outputPath = path.parse(
        path.format(
            Object.assign({}, inputPath, { ext: '.out' + inputPath['ext'], base: '', })));
} else {
    outputPath = path.parse(argv['_'][1]);
}

outputName = outputPath.base;

console.log(inputPath, outputPath, argv.transformToRequire, argv.preserveWhitespace);


/*console.log(`====================== WARNING ======================
                  UNSTABLE VERSION
====================== WARNING ======================
If this program goes wrong, please post an issue to:
https://github.com/RequireSun/vue-compiler-amd/issues
I would appreciate it if you resolved the problem and pull it to my project`);*/