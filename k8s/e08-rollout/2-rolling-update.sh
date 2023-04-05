#!/bin/bash

cd $(dirname -- "$0";)

sh new-image.sh 3

kubectl apply -f rolling-update.yaml
