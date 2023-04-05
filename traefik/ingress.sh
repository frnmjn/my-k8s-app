#!/bin/bash
cd $(dirname -- "$0";)

helm repo add traefik https://traefik.github.io/charts
helm repo update


echo "########################################"
echo "TRAEFIK"
echo "########################################"
helm upgrade --install traefik traefik/traefik --version 21.1.0 -f values-traefik.yaml
sleep 2

kubectl apply -f ingress-route.yaml
kubectl apply -f whoami.yaml
