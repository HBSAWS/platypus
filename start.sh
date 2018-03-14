#!/bin/bash

export NODE_ENV=production
export PATH=/export/tools/framework-tools/mongo/bin:/export/tools/framework-tools/node/bin:/export/home/apps/hbs/.local/bin:$PATH
export PLATYPUS_SESSION_SECRET=1Temporary2
export PLATYPUS_GOOGLE_MAPS_KEY=AIzaSyDXqmioZvV0UP8vfsXZ-qBmKZ_U-RDnfqA
export NODE_TLS_REJECT_UNAUTHORIZED="0"

( nohup node server.js & )

# tail -f nohup.out