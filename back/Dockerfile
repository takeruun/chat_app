FROM ruby

RUN apt-get update && \
        apt-get install -y mariadb-client nodejs --no-install-recommends vim curl && \
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
        apt-get update && apt-get install -y yarn && \
        rm -rf /var/lib/apt/lists/*

RUN mkdir /chat

WORKDIR /chat

ADD Gemfile /chat/Gemfile
ADD Gemfile.lock /chat/Gemfile.lock

RUN gem install bundle

RUN bundle install

ADD . /chat

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 8000