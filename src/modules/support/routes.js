import { Hono } from "hono"

const support = new Hono()

support.get("/", (c) => {
    return c.html(`
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width'>
  <title>Support - ECOF</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 1em; max-width: 600px; margin: auto; }
    h1 { font-size: 1.4em; }
    a { color: #007aff; }
    .section { margin-bottom: 2em; }
    hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
    .lang { font-size: 0.75em; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5em; }
  </style>
</head>
<body>

  <div class="section">
    <div class="lang">🇫🇷 Français</div>
    <h1>Support ECOF</h1>
    <p>Pour toute question ou problème concernant l'application ECOF,
    vous pouvez nous contacter par email :</p>
    <p><a href="mailto:contact@ecof.app">contact@ecof.app</a></p>
    <p>Nous vous répondrons dans les meilleurs délais.</p>
  </div>

  <hr>

  <div class="section">
    <div class="lang">🇬🇧 English</div>
    <h1>ECOF Support</h1>
    <p>For any question or issue regarding the ECOF application,
    please contact us by email:</p>
    <p><a href="mailto:contact@ecof.app">contact@ecof.app</a></p>
    <p>We will get back to you as soon as possible.</p>
  </div>

</body>
</html>
  `)
})

export default support
