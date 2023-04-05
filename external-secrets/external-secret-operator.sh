#!/bin/bash

cd $(dirname -- "$0";)

helm upgrade --install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace --set installCRDs=true
sleep 30
kubectl apply -f cluster-secret-store.yaml
kubectl apply -f external-secret.yaml
