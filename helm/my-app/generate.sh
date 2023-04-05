#!/bin/bash

cd $(dirname -- "$0";)
set -e

# Clear existing config
rm -rf ./generated

# Create directories
mkdir -p ./generated/dev
# mkdir -p ./generated/sandbox
# mkdir -p ./generated/prod

for template in $(ls -1 templates/*.yaml); do
  echo $template 
  configName=$(sed "s#templates/##g" <<< $template)
  helm template -s $template -f values.yaml . >  ./generated/dev/$configName
#   helm template -s $template -f values-sandbox.yaml . >  ./generated/sandbox/$configName
#   helm template -s $template -f values-prod.yaml . >  ./generated/prod/$configName
done
