#!/bin/bash

cd $(dirname -- "$0";)/../..

cd my-app
npm run docker-build

docker tag my-app my-app:$1

kind load docker-image my-app:$1
