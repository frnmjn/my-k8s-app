#!/bin/bash
cd $(dirname -- "$0";)

# https://kind.sigs.k8s.io/docs/user/ingress/
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
sleep 20

sudo -- sh -c -e "echo '127.0.0.1 my-app whoami' >> /etc/hosts";

kubectl apply -f ingress.yaml
kubectl apply -f whoami.yaml
