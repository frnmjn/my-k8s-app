#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm upgrade --install my-app-db bitnami/postgresql \
--version 12.5.6 \
--set global.postgresql.auth.postgresPassword=postgres \
--set global.postgresql.auth.database=my_app_dev
