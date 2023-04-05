#!/bin/bash

cd $(dirname -- "$0";)

sh new-image.sh 2

kubectl apply -f downtime.yaml
