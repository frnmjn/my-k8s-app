"use strict";

const { getMeter } = require("../instrumentations");

module.exports = async function (fastify, opts) {
  fastify.get("/secret", async function (request, reply) {
    fastify.log.info("SECRET NUMBER CALLED");
    fastify.log.info(
      `CAN I READ SECRET NUMBER? ${fastify.config.SECRET_NUMBER}`
    );

    getMeter().createCounter("secret_total").add(1);

    return { secretNumber: fastify.config.SECRET_NUMBER };
  });
};
