FROM ruby:2.7.1-alpine3.12

RUN apk add --update-cache --no-cache tzdata libxml2-dev curl-dev \
  make gcc libc-dev g++ linux-headers \
  mysql-dev mysql-client nodejs git && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir /chat

WORKDIR /chat

ADD Gemfile /chat/Gemfile
ADD Gemfile.lock /chat/Gemfile.lock

RUN gem install bundle && \
  bundle install

RUN rm -rf /usr/local/bundle/cache/* /workdir/vendor/bundle/cache/*

ADD . /chat

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 8000