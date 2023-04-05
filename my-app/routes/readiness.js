"use strict";

const { inspect } = require("node:util");

module.exports = async function (fastify, opts) {
  fastify.get("/readiness", async function (request, reply) {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query("SELECT now()");
      const now = rows[0].now.toISOString();
      fastify.log.debug(`SELECT now() return: ${inspect(rows)}`);
      return {
        now: now,
      };
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release();
    }
  });
};
