#!/bin/bash

cd $(dirname -- "$0";)

kubectl create secret generic my-app-secrets --from-literal=secret-number=42
