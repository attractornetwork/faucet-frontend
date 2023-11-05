FROM node:16 as builder
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_RECAPTCHA_KEY
RUN test -n "$REACT_APP_BACKEND_URL"
RUN test -n "$REACT_APP_RECAPTCHA_KEY"
WORKDIR /workbench
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.25.3 as server
ARG STATIC_SRV_PORT
RUN test -n "$STATIC_SRV_PORT"
ENV STATIC_SRV_PORT=$STATIC_SRV_PORT
ENV STATIC_DIR /var/www/faucet
WORKDIR $STATIC_DIR
COPY --from=builder /workbench/build .
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE $STATIC_SRV_PORT
