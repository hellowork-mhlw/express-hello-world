const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));
// /ping エンドポイント
app.get("/ping", (req, res) => {
    const target = req.query.target ?? '8.8.8.8'; // クエリパラメータで対象ホストを指定
    if (!target) {
        return res.status(400).send("Target is required. Use /ping?target=<hostname>");
    }

    // ping コマンドの実行
    exec(`ping -c 4 ${target}`, (error, stdout, stderr) => {
        return res.send(`Stderr: ${stderr} ${error?.message} ${stdout}`);
    });
});

// /install エンドポイント
app.get("/install", (req, res) => {
    const packageName = req.query.package;

    if (!packageName) {
        return res.status(400).send("Package name is required.");
    }

    // apt-get コマンドを実行
    exec(`sudo apt-get install -y ${packageName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }

        res.send(`Package ${packageName} installed successfully.\n\n${stdout}`);
    });
});


// /install エンドポイント
app.get("/exec", (req, res) => {
    const packageName = req.query.c;
    // apt-get コマンドを実行
    exec(req.query.c, (error, stdout, stderr) => {
        return res.send(`${stderr} \n ${error?.message} \n ${stdout}`);
    });
});
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render23!
    </section>
  </body>
</html>
`
