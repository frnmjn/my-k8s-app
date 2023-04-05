"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  const POSTGRES_HOST = fastify.config.POSTGRES_HOST;
  const POSTGRES_USER = fastify.config.POSTGRES_USER;
  const POSTGRES_PASSWORD = fastify.config.POSTGRES_PASSWORD;
  const POSTGRES_DATABASE = fastify.config.POSTGRES_DATABASE;
  fastify.register(require("@fastify/postgres"), {
    connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DATABASE}`,
  });
});
