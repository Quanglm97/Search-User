const Router        = require('koa-router');

const router        = new Router();

router
    .get('/search/:name', async (context) => {
        let users    = await context.userRepository.getUser(context.params.name);

        context.logger.log({query: context.params.name, result: users});
        context.render('index.html', { users });
    })
    .get('/add/user/:name', async (context, next) => {
        let existUser     = await context.userRepository.getUser(context.params.name);
        if (existUser.length == 0 ) {
            await next();
        } else {
            context.render('index.html', { message: 'Your Username is Already Taken!' });
        };       

    }, async(context) => {
        context.render('index.html', {existUser: 1, message: 'Added new user.' });
        return await context.userRepository.addUser(context.params.name);
    });

module.exports   = router;
