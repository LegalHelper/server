FROM ruby:2.6.3

RUN usermod -a -G sudo root
RUN gem install bundler

RUN apt-get update -qq \
  && apt-get install -y \
    build-essential \
    libpq-dev \
    postgresql-client \
    bash \
    sudo \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
  && curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -y \
    nodejs \
    yarn \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .
