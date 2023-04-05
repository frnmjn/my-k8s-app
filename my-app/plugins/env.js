"use strict";

const fp = require("fastify-plugin");

const schema = {
  type: "object",
  required: [],
  properties: {
    SECRET_NUMBER: {
      type: "number",
      default: 99,
    },
    POSTGRES_HOST: {
      type: "string",
      default: "localhost",
    },
    POSTGRES_USER: {
      type: "string",
      default: "postgres",
    },
    POSTGRES_PASSWORD: {
      type: "string",
      default: "postgres",
    },
    POSTGRES_PORT: {
      type: "string",
      default: "postgres",
    },
    POSTGRES_DATABASE: {
      type: "string",
      default: "my_app_dev",
    },
  },
};

const options = {
  dotenv: true,
  confKey: "config",
  schema: schema,
  data: process.env,
};

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/env"), options).ready((err) => {
    if (err) console.error(err);
    console.log(fastify.config);
  });
});
