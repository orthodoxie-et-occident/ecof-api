import { Hono } from "hono"

const privacy = new Hono()

privacy.get("/", (c) => {
    return c.html(`
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width'>
  <title>Politique de confidentialité / Privacy Policy - ECOF</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 1em; max-width: 700px; margin: auto; }
    h1 { font-size: 1.3em; }
    .section-title { display: block; font-weight: bold; margin-top: 1.2em; margin-bottom: 0.3em; }
    hr { border: none; border-top: 2px solid #ddd; margin: 3em 0; }
    .lang { font-size: 0.75em; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5em; }
    a { color: #007aff; }
  </style>
</head>
<body>

  <!-- ===================== FRANÇAIS ===================== -->
  <div class="lang">🇫🇷 Français</div>
  <span class="section-title">Politique de confidentialité</span>
  <p>Cette politique de confidentialité s'applique à l'application ECOF, créée par Jacques Raoult en tant que service gratuit.</p>

  <span class="section-title">Collecte de données</span>
  <p>L'application ECOF <strong>ne collecte, ne stocke et ne transmet aucune donnée personnelle</strong> de ses utilisateurs.</p>
  <p>Aucun compte utilisateur n'est requis. Aucune information personnelle n'est demandée ou enregistrée par le Prestataire.</p>

  <span class="section-title">Données collectées par les plateformes de distribution</span>
  <p>Les plateformes de distribution (Apple App Store, Google Play Store) peuvent collecter certaines données techniques dans le cadre de leur propre fonctionnement (téléchargements, statistiques d'utilisation agrégées, etc.). Ces données sont soumises aux politiques de confidentialité respectives d'Apple et de Google, sur lesquelles le Prestataire n'a aucun contrôle.</p>
  <ul>
    <li><a href="https://www.apple.com/fr/privacy/" target="_blank">Politique de confidentialité Apple</a></li>
    <li><a href="https://policies.google.com/privacy" target="_blank">Politique de confidentialité Google</a></li>
  </ul>

  <span class="section-title">Enfants</span>
  <p>L'application ne collecte aucune donnée, y compris auprès des enfants de moins de 13 ans.</p>

  <span class="section-title">Modifications</span>
  <p>Cette politique peut être mise à jour. Vous êtes invité à la consulter régulièrement. En vigueur depuis le 14/04/2026.</p>

  <span class="section-title">Nous contacter</span>
  <p>Pour toute question : <a href="mailto:contact@ecof.app">contact@ecof.app</a></p>

  <hr>

  <!-- ===================== ENGLISH ===================== -->
  <div class="lang">🇬🇧 English</div>
  <span class="section-title">Privacy Policy</span>
  <p>This privacy policy applies to the ECOF app, created by Jacques Raoult as a free service.</p>

  <span class="section-title">Data Collection</span>
  <p>The ECOF app <strong>does not collect, store or transmit any personal data</strong> from its users.</p>
  <p>No user account is required. No personal information is requested or stored by the Service Provider.</p>

  <span class="section-title">Data Collected by Distribution Platforms</span>
  <p>Distribution platforms (Apple App Store, Google Play Store) may collect certain technical data as part of their own operations (downloads, aggregated usage statistics, etc.). This data is subject to Apple's and Google's respective privacy policies, over which the Service Provider has no control.</p>
  <ul>
    <li><a href="https://www.apple.com/privacy/" target="_blank">Apple Privacy Policy</a></li>
    <li><a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a></li>
  </ul>

  <span class="section-title">Children</span>
  <p>The app does not collect any data, including from children under the age of 13.</p>

  <span class="section-title">Changes</span>
  <p>This Privacy Policy may be updated from time to time. Effective as of 04/14/2026.</p>

  <span class="section-title">Contact Us</span>
  <p>For any questions: <a href="mailto:contact@ecof.app">contact@ecof.app</a></p>

</body>
</html>
  `)
})

export default privacy
