"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/heavy", async function (request, reply) {
    await new Promise((resolve) => setTimeout(resolve, 20000));
    return "ok";
  });
};
