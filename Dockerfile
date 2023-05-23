# First build
FROM node:18-alpine AS build

WORKDIR /app

# TODO: As we use ocker build secrets here for the npm token, a multi step build is probably not necessary..
COPY ./package.json ./package-lock.json ./
RUN --mount=type=secret,id=npm,target=/root/.npmrc npm ci

COPY . .
RUN npm run build

# Second build
FROM node:18-alpine
WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/.env.production ./.env.production
COPY --from=build /app/next.config.js ./next.config.js

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=secret,id=npm,target=/root/.npmrc npm ci

EXPOSE 3000

ENV PORT 3000

CMD npm start