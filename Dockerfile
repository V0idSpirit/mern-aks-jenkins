# Stage1: UI Build
FROM node:16.15.0-alpine AS client-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd client && npm install && npm run build

# Stage2: API Build
FROM node:16.15.0-alpine AS api-build
WORKDIR /usr/src
COPY backend/ ./api/
RUN cd api && npm install && npm run build
RUN ls

# Stage3: Packagign the app
FROM node:16.15.0-alpine
WORKDIR /root/
COPY --from=client-build /usr/src/client/build ./client/build
COPY --from=api-build /usr/src/api/dist .
RUN ls

EXPOSE 80

CMD ["node", "api.bundle.js"]