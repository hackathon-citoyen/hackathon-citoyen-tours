#!/usr/bin/env bash
set -e

if [ "${1:-}" == "build" ] ; then
  echo "Building docker image..."
  # grunt
  rm -fr docker-build
  mkdir docker-build
  cp Dockerfile docker-build
  cp -r dist docker-build/hackathon-citoyen
  cd docker-build
  docker build -t hackathon-citoyen .

elif [ "${1:-}" == "run" ] ; then

  [[ ! -z "${2:-}" ]] && PARSE_ID="$2"
  [[ ! -z "${3:-}" ]] && PARSE_KEY="$3"
  [[ ! -z "${4:-}" ]] && MAILCHIMP_KEY="$4"

  if [[ -z "$PARSE_ID" || -z "$PARSE_KEY" ]] ; then
    echo "WARNING: Missing Parse configuration"
    echo "Aborted".
    exit 1
  fi

  echo "Running hackathon-citoyen in Docker...";
  echo "Keys: $PARSE_ID $PARSE_KEY $MAILCHIMP_KEY"
  docker run -p 8080:8080 \
    -e PARSE_ID=="${PARSE_ID:-}" \
    -e PARSE_KEY=="${PARSE_KEY:-}"\
    -e MAILCHIMP_KEY="${MAILCHIMP_KEY:-}" \
    --name hackathon-citoyen hackathon-citoyen

else
  echo "Usage:" `basename $0` COMMAND
  echo "  where COMMAND is 'build' or 'run'"
  echo "  'run' accepts three arguments: PARSE_ID PARSE_KEY MAILCHIMP_KEY"
fi


