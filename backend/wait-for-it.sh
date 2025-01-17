#!/bin/bash
# wait-for-it.sh

host="$1"
port="$2"
shift 2

if [ "$1" = "--" ]; then
    shift
fi

until nc -z "$host" "$port"; do
  echo "Waiting for MySQL to be ready..."
  sleep 3
done

exec "$@"
