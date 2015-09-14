#!/bin/bash
if [ "$1" == "deployment" ]
then
  zip -r $2.zip ./ -x "*.git*" -x "venv/*" 
  aws s3 cp $2.zip s3://cirrus-deployments/soj-portal/$2.zip
  rm $2.zip
  aws elasticbeanstalk create-application-version --application-name "soj-portal-latest" --version-label $2 --source-bundle S3Bucket=cirrus-deployments,S3Key=soj-portal/$2.zip
  aws elasticbeanstalk update-environment --environment-name soj-portal-latest --version-label $2
  #aws s3 rm s3://cirrus-deployments/soj-portal --recursive --exclude "fonts.zip"
fi
