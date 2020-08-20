//CHECK DEVELOPMENT OR PRODUCTION

if(processs.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod');
}
else{
    module.exports = require('./keys_dev')
}