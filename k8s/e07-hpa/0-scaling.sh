#!/bin/bash

cd $(dirname -- "$0";)
kubectl apply -f hpa.yaml
kubectl apply -f deployment.yaml

helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm repo update

helm upgrade --install metrics-server metrics-server/metrics-server -f values.yaml
