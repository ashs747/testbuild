import childProcess from 'child_process';
import gutil from 'gulp-util';
import es6Promise from 'es6-promise';
import fs from 'fs';

var spawn = childProcess.spawn;
var Promise = es6Promise.Promise;

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function cmd(command, stdout, stderr) {
  return new Promise(function(resolve, reject) {
    var args = command.split(' ');
    var run = args[0];
    args.shift();

    var child = spawn(run, args, {
      stdio: [process.stdin, 'pipe', 'pipe']
    });

    child.stdout.setEncoding('utf8');
    if (stdout) {
      child.stdout.on('data', function(data) {
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
      child.stderr.on('data', function(data) {
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
  gutil.log(gutil.colors.red("ERROR: ") + message);
}

function hasDockerInstalled() {
  gutil.log(gutil.colors.yellow('Checking docker is installed...'));
  return cmd('docker version', (stdOut) => {
    process.stdout.write(stdOut);
  }, (strErr) => {
    process.stderr.write(stdErr);
    throw new Error("Docker doesn't seem to be installed");
  }).then(() => {
    gutil.log(gutil.colors.green('OK'));
  });
}

function runDockerDaemon() {
  gutil.log(gutil.colors.yellow('Running Docker daemon (in case it isn\'t already)...'));

  var command = 'service docker start';
  gutil.log('CMD ' + gutil.colors.cyan(command));

  return cmd(command, null, function(stderr) {
    process.stderr.write(stderr);

    if (new RegExp("docker.sock: permission denied").test(stderr)) {
      throw "Docker seems to be installed but isn't runnable. Please ensure the Docker daemon is running and you're using this command with root privileges.";
    }

    throw stderr;
  }).then(function() {
    gutil.log(gutil.colors.green('OK'));
  }, function(e) {
      if (e == "Error: spawn ENOENT") {
        e = "docker command unavailable: please install docker https://docs.docker.com/installation/";
      }
      logError(e);
      throw e;
    });
}

function runImage(image, flags, runCommand) {
  gutil.log(gutil.colors.yellow('Running the ' + image + ' docker container image...'));

  var flagString = flags.join(" ");

  runCommand = runCommand ? ' ' + runCommand : '';

  var command = 'docker run ' + flagString + ' ' + image + runCommand;

  gutil.log('CMD ' + gutil.colors.cyan(command));

  return cmd(command, null, function(stderr) {
    throw stderr;
  }).then(function() {
    gutil.log(gutil.colors.green('OK'));
  }).catch(logError);
}

function createContainer(containerName, imageName, runCommand) {
  return cmd(`docker create -v /${containerName} --name ${containerName} ${imageName} ${runCommand}`);
}

function runContainer(imageName, linkName, flags, runCommand) {
  return new Promise(function(resolve, reject) { 
    if (linkName) {
      flags.push("--name " + linkName);
    }

    runCommand = runCommand ? ' ' + runCommand : '';

    gutil.log(gutil.colors.yellow('Checking if we already have the ' + imageName + ' container image...'));

    //Stop the current running container
    cmd('docker rm -f ' + linkName, function() {}, function() {}).then(function() {
      var imagesOutput = "";

      //List out existing built images to see if we need to build a new image from the Dockerfile
      cmd('docker images', function(data) {
        imagesOutput += data;
      }).then(function() {
        var imageNameWithoutTag = imageName.split(":");

        if (!new RegExp("^" + imageNameWithoutTag[0], "m").test(imagesOutput)) {
          gutil.log(gutil.colors.yellow('Nope, downloading ' + imageName + ' docker container image...'));

          var command = 'docker pull ' + imageName;
          gutil.log('CMD ' + gutil.colors.cyan(command));

          cmd(command).then(function() {
            gutil.log(gutil.colors.green('OK'));
            run();
          }).catch(reject);

        } else {
          gutil.log(gutil.colors.green('OK'));
          return run();
        }
      }).catch(logError);
    }).catch(logError);

    function run() {
      gutil.log(gutil.colors.yellow('Running the ' + imageName + ' docker container image...'));

      var flagString = flags.join(" ");
      var command = 'docker run ' + flagString + ' ' + imageName + runCommand;

      gutil.log('CMD ' + gutil.colors.cyan(command));

      return cmd(command, null, function(stderr) {
        throw stderr;
      }).then(function() {
        gutil.log(gutil.colors.green('OK'));
        resolve();
      }).catch(reject);
    }
  });
}

export default {
  cmd: cmd,
  logError: logError,
  hasDockerInstalled: hasDockerInstalled,
  runDockerDaemon: runDockerDaemon,
  runImage: runImage,
  runContainer: runContainer,
  createContainer: createContainer,
  deleteFolderRecursive: deleteFolderRecursive
};
