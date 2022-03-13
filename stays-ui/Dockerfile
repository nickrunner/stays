
# Get NPM packages
FROM node:alpine AS dependencies
RUN mkdir -p /usr/src/app
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
#Copy package.json
COPY stays-ui/package.json stays-ui/package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY stays-ui ./
RUN mkdir -p ./../common
COPY common ./../common
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]