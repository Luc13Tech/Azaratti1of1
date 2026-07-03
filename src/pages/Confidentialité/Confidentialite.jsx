import React from "react";
import { useLang } from "../../context/LangContext.jsx";
import "./Confidentialite.css";

export default function Confidentialite() {
  const { t, lang } = useLang();

  const content = {
    fr: {
      sections: [
        {
          id: "collecte",
          title: "1. Données collectées",
          text: `Nous collectons les données suivantes selon les interactions avec notre plateforme :

**Données de compte** : nom complet, adresse email, mot de passe (hashé avec bcrypt, jamais stocké en clair). Ces données sont nécessaires à la création et gestion de votre espace personnel.

**Données de commande** : articles commandés, tailles, couleurs, quantités, prix. Ces données permettent de traiter votre commande via WhatsApp et d'en conserver un historique.

**Données de demande sur mesure** : nom, email, téléphone, taille/mensurations, couleur, tissu, instructions de conception. Ces données sont indispensables à la confection de votre pièce personnalisée.

**Données de contact** : nom, email, sujet, message. Utilisées uniquement pour répondre à votre demande.

**Données de navigation** : avec votre consentement (cookies), nous pouvons collecter des données de navigation pour améliorer l'expérience utilisateur.`
        },
        {
          id: "finalite",
          title: "2. Finalité du traitement",
          text: `Vos données sont traitées aux seules fins suivantes :
— Gestion de votre compte et authentification sécurisée
— Traitement de vos commandes et communication WhatsApp
— Confection de pièces sur mesure selon vos spécifications
— Réponse à vos demandes de contact
— Amélioration de notre service (avec votre consentement pour les cookies)

Nous n'utilisons jamais vos données à des fins publicitaires, de profilage commercial, ou de revente à des tiers.`
        },
        {
          id: "base-legale",
          title: "3. Base légale",
          text: `Le traitement de vos données repose sur :
— Votre **consentement explicite** lors de la création de compte ou de l'envoi d'un formulaire
— L'**exécution contractuelle** : nécessaire pour traiter votre commande ou votre demande sur mesure
— Notre **intérêt légitime** : sécurité de la plateforme, prévention des abus

Vous pouvez retirer votre consentement à tout moment sans que cela n'affecte la légalité des traitements effectués avant le retrait.`
        },
        {
          id: "conservation",
          title: "4. Durée de conservation",
          text: `— Données de compte : conservées tant que le compte est actif. En cas de suppression de compte, elles sont effacées sous 30 jours.
— Données de commandes : conservées 3 ans à des fins comptables et légales.
— Demandes sur mesure : conservées 2 ans.
— Messages de contact : conservés 1 an.
— Données de cookies (avec consentement) : maximum 13 mois.`
        },
        {
          id: "droits",
          title: "5. Vos droits",
          text: `Conformément au RGPD et aux réglementations applicables en matière de protection des données, vous disposez des droits suivants :

**Droit d'accès** : obtenir une copie de vos données personnelles détenues par AzaRatti.
**Droit de rectification** : corriger des données inexactes ou incomplètes.
**Droit à l'effacement** : demander la suppression de vos données ("droit à l'oubli").
**Droit à la portabilité** : recevoir vos données dans un format structuré et lisible.
**Droit d'opposition** : vous opposer au traitement de vos données pour des motifs légitimes.
**Droit de limitation** : limiter le traitement de vos données dans certains cas.

Pour exercer ces droits, contactez-nous à : **Contact@azaratti.com** en précisant votre demande. Nous y répondrons dans un délai maximal de 30 jours.`
        },
        {
          id: "cookies",
          title: "6. Cookies",
          text: `Notre site utilise les cookies suivants :

**Cookies essentiels** (toujours actifs) : nécessaires au fonctionnement du site — gestion de la session, panier d'achat, préférences de langue. Ces cookies ne nécessitent pas votre consentement.

**Cookies analytiques** (avec consentement) : nous permettent de comprendre comment les utilisateurs naviguent sur notre site afin d'améliorer l'expérience utilisateur. Ces données sont anonymisées.

**Cookies de préférences** (avec consentement) : mémorisent vos choix (langue, etc.) pour améliorer votre expérience lors de vos prochaines visites.

Vous pouvez modifier vos préférences de cookies à tout moment via le bandeau de consentement en bas de page.`
        },
        {
          id: "sous-traitants",
          title: "7. Sous-traitants et transferts",
          text: `AzaRatti fait appel aux sous-traitants suivants, qui présentent des garanties suffisantes en matière de protection des données :

— **MongoDB Atlas** (hébergement base de données) — conforme RGPD, données chiffrées en transit et au repos
— **Render** (hébergement backend API) — serveurs sécurisés
— **Vercel** (hébergement frontend) — serveurs sécurisés avec HTTPS
— **Gmail / Google** (envoi d'emails) — données transitent uniquement pour l'envoi des confirmations

Aucun transfert de vos données personnelles n'est effectué vers des pays tiers sans garanties appropriées.`
        },
        {
          id: "securite",
          title: "8. Sécurité",
          text: `AzaRatti met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :

— Mots de passe hashés avec bcrypt (12 rounds)
— Communication chiffrée via HTTPS/TLS
— Authentification par JWT avec expiration
— Rate limiting pour prévenir les attaques par force brute
— En-têtes HTTP sécurisés (Helmet.js)
— Accès aux données restreint au strict nécessaire`
        },
        {
          id: "contact-dpo",
          title: "9. Contact & Réclamation",
          text: `Pour toute question relative à la protection de vos données ou pour exercer vos droits :

📧 **Email** : Contact@azaratti.com
🌐 **Site** : www.azaratti.com
📍 **Adresse** : Bénin, Afrique de l'Ouest

Si vous estimez que vos droits n'ont pas été respectés, vous avez le droit d'introduire une réclamation auprès de l'autorité de protection des données de votre pays de résidence.`
        },
        {
          id: "terms",
          title: "10. Conditions d'utilisation",
          text: `En utilisant la plateforme AzaRatti 1 of 1, vous acceptez les présentes conditions :

— Les pièces présentées sont des éditions limitées, leur disponibilité peut changer.
— Les prix sont affichés en USD et peuvent évoluer sans préavis.
— La finalisation des commandes et le paiement s'effectuent via WhatsApp avec notre équipe.
— AzaRatti se réserve le droit de refuser une commande sans justification.
— Les images des produits sont données à titre indicatif ; les couleurs peuvent légèrement varier selon votre écran.
— Toute reproduction du contenu, des images ou du logo AzaRatti sans autorisation est interdite.`
        },
      ]
    }
  };

  const sections = content.fr.sections;

  return (
    <main className="page confidentialite">
      <div className="confidentialite__header">
        <div className="container">
          <p className="eyebrow">Légal</p>
          <h1 className="display-2">{t("privacy.title")}</h1>
          <p className="confidentialite__date">{t("privacy.lastUpdated")}</p>
          <p className="confidentialite__intro">{t("privacy.intro")}</p>
        </div>
      </div>

      <div className="container confidentialite__body">
        {/* TOC */}
        <nav className="confidentialite__toc">
          <p className="confidentialite__toc-title">Sommaire</p>
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="confidentialite__toc-link">{s.title}</a>
          ))}
        </nav>

        {/* Sections */}
        <div className="confidentialite__content">
          {sections.map(s => (
            <section key={s.id} id={s.id} className="confidentialite__section">
              <h2 className="confidentialite__section-title">{s.title}</h2>
              <div className="confidentialite__section-text">
                {s.text.split("\n\n").map((para, i) => {
                  const formatted = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                  return (
                    <p key={i} dangerouslySetInnerHTML={{ __html: formatted.replace(/\n/g, "<br/>") }} />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
