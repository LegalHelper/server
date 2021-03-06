#!/bin/sh

set -e

rm -rf /usr/src/app/tmp/pids/server.pid
yarn install --check-files
bundle install
bundle exec rails db:create
bundle exec rails db:schema:load
bundle exec rails db:migrate
bundle exec rails db:seed
bundle exec rails s -p 3000 -b 0.0.0.0
