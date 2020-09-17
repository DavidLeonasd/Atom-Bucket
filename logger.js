const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'log.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );

module.exports.log=log;