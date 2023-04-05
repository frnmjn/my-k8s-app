#!/bin/bash

cd $(dirname -- "$0";)
k6 run script.js
