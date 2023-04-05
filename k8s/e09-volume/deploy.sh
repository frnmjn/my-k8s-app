#!/bin/bash
cd $(dirname -- "$0";)
kubectl apply -f persistent-volume-claim.yaml
kubectl apply -f deployment.yaml
