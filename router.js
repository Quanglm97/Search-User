const Router        = require('koa-router');

const router        = new Router();

router
    .get('/search/:name', async (context) => {
        let users    = await context.userRepository.getUser(context.params.name);

        context.logger.log({query: context.params.name, result: users});
        context.render('index.html', { users });
    })
    .get('/add/user/:name', async (context, next) => {
        let users    = await context.userRepository.getUser(context.params.name);
        if (users.length == 0 ) {
            await next();
        } else {
            context.render('add.user.html', { message: 'Your Username is Already Taken!' });
        };       

    }, async(context) => {
        context.render('add.user.html', { message: 'Successful registration!' });
        return await context.userRepository.addUser(context.params.name);
    });

module.exports   = router;
