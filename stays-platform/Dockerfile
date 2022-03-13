# Get NPM packages
FROM node:alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /stays-ui
COPY /stays-ui/package.json package-lock.json ./
COPY --from=dependencies /stays-ui/node_modules ./node_modules
RUN npm install

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /stays-ui
COPY . .
COPY --from=dependencies /stays-ui/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /stays-ui

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /stays-ui/.next ./.next
COPY --from=builder /stays-ui/node_modules ./node_modules
COPY --from=builder /stays-ui/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]