
# Get NPM packages
FROM node:alpine AS dependencies
RUN mkdir -p /usr/src/app
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
#Copy package.json
COPY stays-platform/package.json stays-platform/package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY stays-platform ./
COPY common ./../common
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run 
FROM node:alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S platform -u 1001

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=platform:nodejs /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package.json ./package.json

USER platform
EXPOSE 3001

CMD ["npm", "start"]