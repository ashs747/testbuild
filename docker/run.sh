#!/bin/bash
versionName = "${3:0:3}-${2:0:8}"
if [ "$1" == "deployment" ]
then
  if [ "$3" == "staging" ]
  then
    cp -f app/src/localConfig.js.staging app/src/localConfig.js
  else
    if [ "$3" == "live" ]
    then
      cp -f app/src/localConfig.js.prod app/src/localConfig.js
    else
      cp -f app/src/localConfig.js.nightly app/src/localConfig.js
    fi
  fi
  ./node_modules/gulp/bin/gulp.js build
  zip -r $versionName.zip ./ -x "*.git*" -x "venv/*" -x "node_modules/*"
  aws s3 cp $versionName.zip s3://cirrus-deployments/soj-portal/$versionName.zip
  rm $2.zip
  aws elasticbeanstalk create-application-version --application-name "SOJ Portal" --version-label $versionName --source-bundle S3Bucket=cirrus-deployments,S3Key=soj-portal/$versionName.zip
  aws elasticbeanstalk update-environment --environment-name soj-portal-$3 --version-label $versionName
fi
