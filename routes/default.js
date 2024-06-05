
function index(req, res) {
    res.send('hello world!');
}

function hello(req, res) {
    console.log('req', JSON.stringify(req.params));
    const name = req.params.name ?? "world";
    res.send(`hello ${name}!`);
}

function healthCheck(req, res) {
    res.send(`App is Healthy!!`);
}

export { index, hello, healthCheck };
