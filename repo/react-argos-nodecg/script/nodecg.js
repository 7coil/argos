const { NodeCGServer } = require("nodecg/out/server/server");

const server = new NodeCGServer();
server.on("error", () => {
  gracefulExit(1);
});
server.on("stopped", () => {
  if (!process.exitCode) {
    gracefulExit(0);
  }
});
server.start().catch((error) => {
  console.error(error);
  process.nextTick(() => {
    gracefulExit(1);
  });
});
