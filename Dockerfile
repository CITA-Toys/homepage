FROM ubuntu:18.04

# install nodejs nginx and so on...
RUN apt-get update -qq && \
 DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential libpq-dev git autoconf locales locales-all curl vim openssl libssl-dev libyaml-dev libxslt-dev cmake htop libreadline6-dev nginx tzdata && \
 curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
 curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
 echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
 apt-get update -qq && \
 apt-get install -y nodejs yarn && \
 apt-get clean && \
 rm -rf /var/lib/apt/lists/*

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

# install ruby
ENV RUBY_VERSION "2.5.1"
RUN echo 'gem: --no-document' >> /usr/local/etc/gemrc &&\
    mkdir /src && cd /src && git clone https://github.com/rbenv/ruby-build.git --depth 1 &&\
    cd /src/ruby-build && ./install.sh &&\
    cd / && rm -rf /src/ruby-build &&\
    ruby-build $RUBY_VERSION /usr/local/
RUN gem install bundler

# clone repo
RUN mkdir /app
WORKDIR /app
COPY . .
RUN bundle install && yarn && yarn build
ENV APP_ROOT /app/build

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
