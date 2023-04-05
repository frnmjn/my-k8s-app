"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/periodic-task", async function (request, reply) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "PERIODIC STUFF";
  });
};
