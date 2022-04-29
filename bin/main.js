let SessionsProcess = require('../obj/src/container/SessionsProcess').SessionsProcess;

try {
    new SessionsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
