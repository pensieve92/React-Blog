const Router = require('koa-router');
const posts = require('./posts');
const auth = require('./auth');

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// api.get('/test', (ctx) => {
//     ctx.body = 'text 성공';
// });

// 라우터를 내보냅니다.
module.exports = api;