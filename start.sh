#!/bin/bash
echo "Wait for MongoDB..."
sleep 5
echo "Starting Script..."
mongosh <<EOF
use admin
db.auth("root", "example")
load("docker-entrypoint-initdb.d/init.js")
EOF
