# build stage
FROM node:18-alpine AS build

WORKDIR /app

# TODO: As we use docker build secrets here for the npm token, a multi step build is probably not necessary..
COPY ./package.json ./package-lock.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci

COPY . .
RUN npm run build

# prod stage
FROM node:18-alpine
WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci

CMD npm run start -- -p 8080