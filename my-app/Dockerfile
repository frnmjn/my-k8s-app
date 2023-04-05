#
# Pull production dependencies only
#
# NB! This avoids running 'npm install -g npm'
# in the 'app' image which doesn't need it.
#
FROM node:18.15.0-alpine AS deps

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm ci --production

#
# Final image
#
FROM node:18.15.0-alpine AS app

WORKDIR /app

RUN chown root:root /app -R
USER root:root

# Copy production dependencies
COPY --from=deps --chown=nobody:nobody /app/node_modules ./node_modules
ADD package.json .
ADD app.js .
ADD instrumentations.js .
COPY plugins ./plugins
COPY routes ./routes

# Fastify configuration
ENV FASTIFY_ADDRESS=0.0.0.0

EXPOSE 3000

# CMD npm start
CMD npm start

