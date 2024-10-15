const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
const express = require("express");
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const uri = process.env.URI;
const client = new MongoClient(uri);
client.connect();

const database = client.db('Godowns_Items');
const godowns = database.collection('Godowns');
const items = database.collection('Items');

const authdb = client.db('Auth');
const authdata = authdb.collection('Auth_Data');
app.use(cors({credentials: true, origin: ['http://localhost:3000', 'http://jdtaskbackend.tech']}));
app.use(cookieParser());
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const http = require("http").createServer(app);

app.get('/task', async (req, res) => {
    console.log('started')
    var t = await godowns.find({parent_godown: null}).toArray()
    for(var i=0; i<t.length; i++){
        var hj = await godowns.find({parent_godown: t[i]['id']}).toArray()
        for(var nn=0; nn<hj.length; nn++){
            var hjq = await godowns.find({parent_godown: hj[nn]['id']}).toArray()
            if(hjq.length!=0){
                for(var gh=0; gh<hjq.length; gh++){
                    var hjqb = await godowns.find({parent_godown: hjq[gh]['id']}).toArray()
                    if(hjqb.length!=0){
                        for(var ff=0; ff<hjqb.length; ff++){
                            //var hjaq = await items.find({godown_id: hjqb[ff]['id']}).toArray()
                            var hjaq = await items.aggregate([
                                {$match: {godown_id: hjqb[ff]['id']}},
                                {$project: {
                                    name: 1,
                                    godown_id: 1,
                                    id: {$concat: ["item_", "$item_id"]}
                                }}
                            ]).toArray()
                            hjqb[ff]['children'] = hjaq;
                        }
                    }else{
                        //var hjaq = await items.find({godown_id: hjq[gh]['id']}).toArray()
                        var hjaq = await items.aggregate([
                            {$match: {godown_id: hjq[gh]['id']}},
                            {$project: {
                                name: 1,
                                godown_id: 1,
                                id: {$concat: ["item_", "$item_id"]}
                            }}
                        ]).toArray()
                        hjqb = hjaq;
                    }
                    hjq[gh]['children'] = hjqb;
                }
            }else{
                //var hjaq = await items.find({godown_id: hj[nn]['id']}).toArray()
                var hjaq = await items.aggregate([
                    {$match: {godown_id: hj[nn]['id']}},
                    {$project: {
                        name: 1,
                        godown_id: 1,
                        id: {$concat: ["item_", "$item_id"]}
                    }}
                ]).toArray()
                hjq = hjaq;
            }
            hj[nn]['children'] = hjq;
        }
        t[i]['children'] = hj;
    }
    res.send(t)
})
app.get('/info', async (req, res) => {
    var token = req.cookies.token;
    if (!token) return res.json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
        if (err) return res.json({ auth: false, message: 'Failed to authenticate token.' });
        req.email = decoded.email;
    });
    var yy = req.headers.id;
    var hh = yy.substring(5)
    console.log('....')
    console.log(yy)
    console.log(hh)
    console.log('.....')
    var g = await items.findOne({item_id: hh});
    res.json({auth: true, data: g})
})

app.get('/aa', async(req, res) => {
    res.send('hehe')
})
app.get('/items', async(req, res) => {
    const h = await items.find().toArray()
    res.send(h)
})
app.get('/bb', async(req, res) => {
    const h = await godowns.findOne()
    res.send(h);
})

app.post('/signin', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);
    const find = await authdata.findOne({
        email: email
    });
    if(find){
        if(bcrypt.compareSync(password, find.password)){
            const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
              }).json({'auth': 'true'});
        }else{
            res.json({'auth': 'false', 'message': 'Invalid password'})
        }
    }
})

app.post('/signup', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);
    const data = {
        email: email,
        password: hashed
    }
    const find = await authdata.findOne({email: email});
    if(find){
        res.send({'auth': 'false', 'message': 'Already exists'})
    }
    const add = await authdata.insertOne(data);
    const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
              }).json({'auth': 'true'});
    res.send({'auth': 'true'});
})

http.listen(PORT, () => {
    console.log('listening on *:' + PORT);
  });