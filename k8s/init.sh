#!/bin/bash

cd $(dirname -- "$0";)

sh ./e00-cluster/cluster.sh
sh ./e01-db/db.sh
sh ./e02-deploy/image.sh
sh ./e03-service/service.sh
sh ./e04-secret/0-secret.sh
sh ./e07-hpa/0-scaling.sh
sh ./e09-volume/deploy.sh
sleep 20
sh ./e06-ingress/ingress.sh

