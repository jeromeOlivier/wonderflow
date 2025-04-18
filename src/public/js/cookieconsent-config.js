CookieConsent.run({
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {}
  },
  language: {
    default: "fr",
    translations: {
      fr: {
        consentModal: {
          title: "Utilisation des cookies",
          description: "Nous utilisons des cookies pour améliorer votre expérience.",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Essentiel uniquement",
          showPreferencesBtn: "Personnaliser"
        },
        preferencesModal: {
          title: "Préférences des cookies",
          savePreferencesBtn: "Enregistrer",
          closeIconLabel: "Fermer",
          sections: [
            {
              title: "Cookies essentiels",
              description: "Indispensables au bon fonctionnement du site.",
              linkedCategory: "necessary"
            },
            {
              title: "Cookies analytiques",
              description: "Utilisés pour comprendre comment vous interagissez avec le site.",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  }
});
