#!/bin/bash
if [ "$1" == "deployment" ]
then
  zip -r --exclude=*.git* $2.zip ./
  aws s3 cp $2.zip s3://cirrus-deployments/scb-portal/$2.zip
  rm $2.zip
  aws elasticbeanstalk create-application-version --application-name "SCB Portal" --version-label $2 --source-bundle S3Bucket=cirrus-deployments,S3Key=scb-portal/$2.zip
  aws elasticbeanstalk update-environment --environment-name scb-portal-latest --version-label $2
  #aws s3 rm s3://cirrus-deployments/scb-portal --recursive --exclude "fonts.zip"
fi
