# build stage
FROM node:18-alpine AS build

WORKDIR /app

# TODO: As we use docker build secrets here for the npm token, a multi step build is probably not necessary..
COPY ./package.json ./package-lock.json ./
RUN --mount=type=secret,id=npm,target=/root/.npmrc npm ci

COPY . .
RUN npm run build

# prod stage
FROM node:18-alpine
WORKDIR /app

# TODO: .env.production is not really used, this will be replaced by env variable from Cloud Run
COPY --from=build /app/package.json /app/package-lock.json /app/.env.production /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=secret,id=npm,target=/root/.npmrc npm ci

EXPOSE 3000
ENV PORT 3000

CMD npm start