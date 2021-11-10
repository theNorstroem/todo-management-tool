#! /bin/bash

# generate random mock data and start mockserver
# ./node_modules/swagger-jsblade-en/bin/blade.js mock ../api/dist/openapi/all-services.swagger.json -s 8481

#  start mockserver without generate mock data
./node_modules/swagger-jsblade-en/bin/blade.js mock ../api/dist/openapi/all-services.swagger.json -k -s 8481

