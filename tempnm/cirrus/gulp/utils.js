'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var spawn = _child_process2['default'].spawn;
var Promise = _es6Promise2['default'].Promise;

var deleteFolderRecursive = function deleteFolderRecursive(path) {
  if (_fs2['default'].existsSync(path)) {
    _fs2['default'].readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (_fs2['default'].lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        _fs2['default'].unlinkSync(curPath);
      }
    });
    _fs2['default'].rmdirSync(path);
  }
};

function cmd(command, stdout, stderr) {
  return new Promise(function (resolve, reject) {
    var args = command.split(' ');
    var run = args[0];
    args.shift();

    var child = spawn(run, args, {
      stdio: [process.stdin, 'pipe', 'pipe']
    });

    child.stdout.setEncoding('utf8');
    if (stdout) {
      child.stdout.on('data', function (data) {
        try {
          stdout(data);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      child.stdout.pipe(process.stdout);
    }

    child.stderr.setEncoding('utf8');
    if (stderr) {
      child.stderr.on('data', function (data) {
        try {
          stderr(data);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      child.stderr.pipe(process.stderr);
    }

    child.stdout.on('close', resolve);
    child.on('error', reject);
  });
}

function logError(message) {
  _gulpUtil2['default'].log(_gulpUtil2['default'].colors.red("ERROR: ") + message);
}

function hasDockerInstalled() {
  _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Checking docker is installed...'));
  return cmd('docker version', function (stdOut) {
    process.stdout.write(stdOut);
  }, function (strErr) {
    process.stderr.write(stdErr);
    throw new Error("Docker doesn't seem to be installed");
  }).then(function () {
    _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
  });
}

function runDockerDaemon() {
  _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Running Docker daemon (in case it isn\'t already)...'));

  var command = 'service docker start';
  _gulpUtil2['default'].log('CMD ' + _gulpUtil2['default'].colors.cyan(command));

  return cmd(command, null, function (stderr) {
    process.stderr.write(stderr);

    if (new RegExp("docker.sock: permission denied").test(stderr)) {
      throw "Docker seems to be installed but isn't runnable. Please ensure the Docker daemon is running and you're using this command with root privileges.";
    }

    throw stderr;
  }).then(function () {
    _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
  }, function (e) {
    if (e == "Error: spawn ENOENT") {
      e = "docker command unavailable: please install docker https://docs.docker.com/installation/";
    }
    logError(e);
    throw e;
  });
}

function runImage(image, flags, runCommand) {
  _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Running the ' + image + ' docker container image...'));

  var flagString = flags.join(" ");

  runCommand = runCommand ? ' ' + runCommand : '';

  var command = 'docker run ' + flagString + ' ' + image + runCommand;

  _gulpUtil2['default'].log('CMD ' + _gulpUtil2['default'].colors.cyan(command));

  return cmd(command, null, function (stderr) {
    throw stderr;
  }).then(function () {
    _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
  })['catch'](logError);
}

function createContainer(containerName, imageName, runCommand) {
  return cmd('docker create -v /' + containerName + ' --name ' + containerName + ' ' + imageName + ' ' + runCommand);
}

function runContainer(imageName, linkName, flags, runCommand) {
  return new Promise(function (resolve, reject) {
    if (linkName) {
      flags.push("--name " + linkName);
    }

    runCommand = runCommand ? ' ' + runCommand : '';

    _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Checking if we already have the ' + imageName + ' container image...'));

    //Stop the current running container
    cmd('docker rm -f ' + linkName, function () {}, function () {}).then(function () {
      var imagesOutput = "";

      //List out existing built images to see if we need to build a new image from the Dockerfile
      cmd('docker images', function (data) {
        imagesOutput += data;
      }).then(function () {
        var imageNameWithoutTag = imageName.split(":");

        if (!new RegExp("^" + imageNameWithoutTag[0], "m").test(imagesOutput)) {
          _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Nope, downloading ' + imageName + ' docker container image...'));

          var command = 'docker pull ' + imageName;
          _gulpUtil2['default'].log('CMD ' + _gulpUtil2['default'].colors.cyan(command));

          cmd(command).then(function () {
            _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
            run();
          })['catch'](reject);
        } else {
          _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
          return run();
        }
      })['catch'](logError);
    })['catch'](logError);

    function run() {
      _gulpUtil2['default'].log(_gulpUtil2['default'].colors.yellow('Running the ' + imageName + ' docker container image...'));

      var flagString = flags.join(" ");
      var command = 'docker run ' + flagString + ' ' + imageName + runCommand;

      _gulpUtil2['default'].log('CMD ' + _gulpUtil2['default'].colors.cyan(command));

      return cmd(command, null, function (stderr) {
        throw stderr;
      }).then(function () {
        _gulpUtil2['default'].log(_gulpUtil2['default'].colors.green('OK'));
        resolve();
      })['catch'](reject);
    }
  });
}

exports['default'] = {
  cmd: cmd,
  logError: logError,
  hasDockerInstalled: hasDockerInstalled,
  runDockerDaemon: runDockerDaemon,
  runImage: runImage,
  runContainer: runContainer,
  createContainer: createContainer,
  deleteFolderRecursive: deleteFolderRecursive
};
module.exports = exports['default'];