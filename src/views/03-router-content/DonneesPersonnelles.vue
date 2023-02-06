<template>
  <div class="ma-4 ml-8">

    <h1 style="color : #252C61; font-weight: bold">Données personnelles</h1>
    <p> L'ABES s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général européen sur la Protection des Données (RGPD). </p>

    <h2>1. Gestion des données personnelles</h2>
    <p>Aucune information personnelle n’est collectée à votre insu.</p>

    <h2>2. A propos des cookies</h2>
    <p>Nous utilisons différents cookies sur le site pour améliorer l’interactivité du site et nos services.</p>

    <h3>A. Qu'est-ce qu'un "cookie" ?</h3>
    <p> Un "cookie" est un fichier de taille limitée, généralement constitué de lettres et de chiffres, envoyé par le serveur internet au fichier cookie de votre navigateur. </p>
    <p>
      <a class="linkBlue" href="https://www.cnil.fr/node/337" target="_blank">En savoir plus sur les cookies, leur fonctionnement et les moyens de s’y opposer</a>.
    </p>

    <h3>B. Types de cookies déposés sur ce site :</h3>

    <h4>1) Cookies internes nécessaires au fonctionnement du site</h4>
    <p> Ces cookies permettent au site de fonctionner de manière optimale. Vous pouvez vous y opposer et les supprimer en utilisant les paramètres de votre navigateur, cependant votre expérience utilisateur risque d’être dégradée. </p>
    <table>
      <thead>
        <tr>
          <th>Nom du cookie</th>
          <th>Finalité</th>
          <th>Durée de conservation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cookie-banner-accept</td>
          <td>Acceptation de l’utilisation de cookies</td>
          <td>13 mois</td>
        </tr>
      </tbody>
    </table>

    <h4>2) Cookies de mesure d’audience</h4>
    <p> En vue d’adapter le site aux demandes de ses visiteurs, nous mesurons le nombre de visites, le nombre de pages vues ainsi que l'activité des visiteurs sur le site et leur fréquence de retour. PIWIK, l'outil de statistiques utilisé par l'ABES, génère les cookies suivants : </p>
    <table>
      <thead>
        <tr>
          <th>Nom du cookie</th>
          <th>Finalité</th>
          <th>Durée de conservation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pk_session</td>
          <td>Statistiques piwik</td>
          <td>7 jours</td>
        </tr>
      <tr>
        <td>pk_id</td>
        <td>Statistiques piwik</td>
        <td>30 minutes</td>
      </tr>
      </tbody>
    </table>
    <p> Nous collectons également votre adresse IP, anonymisée, afin de déterminer la ville depuis laquelle vous vous connectez. L'application Ce site ne peut donc en aucun cas remonter par ce biais à une personne physique. </p>
    <p> Les données personnelles recueillies (identifiant du cookie) sont conservées par l'ABES pour une durée de 13 mois. Elles ne sont ni cédées à des tiers, ni utilisées à d'autres fins. </p>
    <p>Vous pouvez choisir de refuser les cookies et l’analyse statistique de vos données de navigation.</p>
  </div>
</template>

<script>
export default {
  name: "DonneesPersonnelles"
}
</script>

<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  margin-bottom: 20px;
}

td, th {
  border: 1px solid #dddddd;
  font-size: 0.9em;
  text-align: left;
  padding: 8px;
}

</style>