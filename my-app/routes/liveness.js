"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/liveness", async function (request, reply) {
    return "ok";
  });
};
