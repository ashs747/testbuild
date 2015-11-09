#!/bin/bash
if [ "$1" == "deployment" ]
then
  if [ "$3" == "staging" ]
  then
    cp -f app/src/localConfig.js.prod app/src/localConfig.js
  else
    cp -f app/src/localConfig.js.nightly app/src/localConfig.js
  fi
  ./node_modules/gulp/bin/gulp.js build
  zip -r $2.zip ./ -x "*.git*" -x "venv/*" -x "node_modules/*"
  aws s3 cp $2.zip s3://cirrus-deployments/soj-portal/$2.zip
  rm $2.zip
  aws elasticbeanstalk create-application-version --application-name "SOJ Portal" --version-label $2 --source-bundle S3Bucket=cirrus-deployments,S3Key=soj-portal/$2.zip
  aws elasticbeanstalk update-environment --environment-name soj-portal-$3 --version-label $2
fi
