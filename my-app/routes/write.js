const fs = require("fs");

module.exports = async function (fastify, opts) {
  fastify.get("/write", async function (request, reply) {
    fs.writeFile("/tmp/write.txt", "42", (err) => {
      if (err) {
        console.error(err);
      }
    });
    return "ok";
  });
};
