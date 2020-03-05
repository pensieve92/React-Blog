require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const mongoose = require('mongoose');

const session = require('koa-session');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {    // 옵션 추가
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }).then(() => { 
    console.log('connected to mongdb');
}).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// 세션/키 적용 // https://github.com/koajs/session
const sessionConfig =  {
    maxAge: 86400000, // 하루
    // signed: true (기본으로 설정되어있음)
}

app.use(session(sessionConfig, app));
app.keys = [signKey];

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('Listening to port', port);
})