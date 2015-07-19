#!/bin/bash
if [ "$1" == "deployment" ]
then
  zip -r --exclude=*.git* $2.zip ./
  aws s3 cp $2.zip s3://cirrus-deployments/react-reflux-skeleton/$2.zip
  rm $2.zip
  aws elasticbeanstalk create-application-version --application-name "React Reflux Skeleton" --version-label $2 --source-bundle S3Bucket=cirrus-deployments,S3Key=core/$2.zip
  aws elasticbeanstalk update-environment --environment-name react-reflux-skeleton --version-label $2
fi
