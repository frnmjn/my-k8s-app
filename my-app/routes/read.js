const fs = require("fs");

module.exports = async function (fastify, opts) {
  fastify.get("/read", async function (request, reply) {
    let data;
    try {
      data = fs.readFileSync("/tmp/write.txt", "utf8");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    return data;
  });
};
