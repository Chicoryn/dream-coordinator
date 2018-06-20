FROM ruby:latest
EXPOSE 5000

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install nodejs
RUN npm install -g yarn

ENV RAILS_ENV "production"
ENV NODE_ENV "production"
VOLUME [ "/app" ]

WORKDIR /app
COPY Gemfile ./
COPY Gemfile.lock ./
RUN bundle install
