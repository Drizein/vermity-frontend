FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:latest AS deploy
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/sites-enabled/default
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]