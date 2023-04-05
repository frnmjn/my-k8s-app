#!/bin/bash

kubectl port-forward svc/my-app-db-postgresql 5432:5432
