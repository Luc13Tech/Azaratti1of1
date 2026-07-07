import React from "react";
import { useLang } from "../../context/LangContext.jsx";
import "./Confidentialite.css";

export default function Confidentialite() {
  const { t } = useLang();

  const sections = [
    {
      id: "collecte", title: "1. Données collectées",
      text: `Nous collectons les données suivantes selon vos interactions avec notre plateforme :\n\n**Données de compte** : nom complet, adresse email, mot de passe (hashé avec bcrypt, jamais stocké en clair).\n\n**Données de commande** : articles commandés, tailles, couleurs, quantités, prix.\n\n**Données de demande sur mesure** : nom, email, téléphone, taille/mensurations, couleur, tissu, instructions de conception.\n\n**Données de contact** : nom, email, sujet, message.\n\n**Données de navigation** : avec votre consentement, données de navigation pour améliorer l'expérience utilisateur.`
    },
    {
      id: "finalite", title: "2. Finalité du traitement",
      text: `Vos données sont traitées aux seules fins suivantes :\n\n— Gestion de votre compte et authentification sécurisée\n— Traitement de vos commandes et communication WhatsApp\n— Confection de pièces sur mesure selon vos spécifications\n— Réponse à vos demandes de contact\n— Amélioration de notre service (avec consentement pour les cookies)\n\nNous n'utilisons jamais vos données à des fins publicitaires, de profilage commercial, ou de revente à des tiers.`
    },
    {
      id: "base-legale", title: "3. Base légale",
      text: `Le traitement de vos données repose sur :\n\n— Votre **consentement explicite** lors de la création de compte ou de l'envoi d'un formulaire\n— L'**exécution contractuelle** : nécessaire pour traiter votre commande\n— Notre **intérêt légitime** : sécurité de la plateforme, prévention des abus\n\nVous pouvez retirer votre consentement à tout moment.`
    },
    {
      id: "conservation", title: "4. Durée de conservation",
      text: `— Données de compte : conservées tant que le compte est actif, effacées sous 30 jours après suppression.\n— Données de commandes : conservées 3 ans à des fins légales.\n— Demandes sur mesure : conservées 2 ans.\n— Messages de contact : conservés 1 an.\n— Données de cookies : maximum 13 mois.`
    },
    {
      id: "droits", title: "5. Vos droits",
      text: `Vous disposez des droits suivants :\n\n**Droit d'accès** : obtenir une copie de vos données personnelles.\n**Droit de rectification** : corriger des données inexactes.\n**Droit à l'effacement** : demander la suppression de vos données.\n**Droit à la portabilité** : recevoir vos données dans un format structuré.\n**Droit d'opposition** : vous opposer au traitement pour motifs légitimes.\n**Droit de limitation** : limiter le traitement dans certains cas.\n\nPour exercer ces droits : **Contact@azaratti.com**`
    },
    {
      id: "cookies", title: "6. Cookies",
      text: `**Cookies essentiels** (toujours actifs) : gestion de la session, panier, préférences de langue.\n\n**Cookies analytiques** (avec consentement) : comprendre la navigation pour améliorer l'expérience.\n\n**Cookies de préférences** (avec consentement) : mémoriser vos choix pour vos prochaines visites.\n\nVous pouvez modifier vos préférences via le bandeau en bas de page.`
    },
    {
      id: "sous-traitants", title: "7. Sous-traitants et transferts",
      text: `— **MongoDB Atlas** (base de données) — données chiffrées en transit et au repos\n— **Render** (hébergement backend API) — serveurs sécurisés\n— **Vercel** (hébergement frontend) — HTTPS, serveurs sécurisés\n— **Gmail / Google** (envoi d'emails) — uniquement pour les confirmations\n\nAucun transfert vers des pays tiers sans garanties appropriées.`
    },
    {
      id: "securite", title: "8. Sécurité",
      text: `Mesures techniques mises en œuvre :\n\n— Mots de passe hashés avec bcrypt (12 rounds)\n— Communication chiffrée via HTTPS/TLS\n— Authentification par JWT avec expiration\n— Rate limiting contre les attaques par force brute\n— En-têtes HTTP sécurisés (Helmet.js)\n— Accès aux données restreint au strict nécessaire`
    },
    {
      id: "contact-dpo", title: "9. Contact & Réclamation",
      text: `Pour toute question relative à la protection de vos données :\n\n📧 **Email** : Contact@azaratti1of1.com\n🌐 **Site** : www.azaratti1of1.com\n📍 **Adresse** : Dakar, Sénégal, Afrique de l'Ouest\n\nSi vous estimez que vos droits n'ont pas été respectés, vous avez le droit d'introduire une réclamation auprès de l'autorité de protection des données de votre pays.`
    },
    {
      id: "terms", title: "10. Conditions d'utilisation",
      text: `En utilisant la plateforme AzaRatti 1 of 1, vous acceptez les présentes conditions :\n\n— Les pièces sont des éditions limitées, leur disponibilité peut changer.\n— Les prix sont affichés en USD et peuvent évoluer sans préavis.\n— La finalisation des commandes s'effectue via WhatsApp avec notre équipe.\n— AzaRatti se réserve le droit de refuser une commande sans justification.\n— Toute reproduction du contenu, des images ou du logo AzaRatti sans autorisation est interdite.`
    },
  ];

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

      <div className="container">
        <div className="confidentialite__body">
          <nav className="confidentialite__toc">
            <p className="confidentialite__toc-title">Sommaire</p>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="confidentialite__toc-link">
                {s.title}
              </a>
            ))}
          </nav>

          <div className="confidentialite__content">
            {sections.map(s => (
              <section key={s.id} id={s.id} className="confidentialite__section">
                <h2 className="confidentialite__section-title">{s.title}</h2>
                <div className="confidentialite__section-text">
                  {s.text.split("\n\n").map((para, i) => {
                    const html = para
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>");
                    return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
