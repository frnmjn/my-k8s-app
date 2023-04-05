#!/bin/bash

cd $(dirname -- "$0";)/../..

cd my-app
npm run docker-build

docker tag my-app my-app:1

# https://kind.sigs.k8s.io/docs/user/quick-start/#loading-an-image-into-your-cluster
kind load docker-image my-app:1
