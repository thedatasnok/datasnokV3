FROM node:17-alpine AS builder

WORKDIR /tmp/apps/web
COPY . .

RUN yarn
RUN yarn build

FROM nginx:alpine

COPY --from=builder /tmp/apps/web/dist /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
