FROM node:20-bullseye-slim as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

FROM base as runner
RUN npm ci --omit dev
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 80
EXPOSE 1883
USER node
ENTRYPOINT [ "npm", "run", "start" ]
