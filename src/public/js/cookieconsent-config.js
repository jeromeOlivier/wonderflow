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
          description: `Ce site utilise uniquement des cookies essentiels et des cookies analytiques (Google Analytics) pour améliorer votre expérience et comprendre comment notre site est utilisé. Vous pouvez les accepter tous ou personnaliser vos choix. Pour en savoir plus, consultez notre <a href="/policy" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>.`,
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
              description: "Nécessaires au bon fonctionnement du site. Ils ne peuvent pas être désactivés.",
              linkedCategory: "necessary"
            },
            {
              title: "Cookies analytiques",
              description: "Nous utilisons Google Analytics pour collecter des statistiques anonymes sur l'utilisation du site. Cela nous aide à améliorer votre expérience.",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  },
  guiOptions: {
    consentModal: { layout: 'box', position: 'bottom right' }
  },
  onConsent: ({ cookie }) => {
    if (cookie.categories.includes('analytics')) {
      const script = document.createElement('script');
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-97RRFVQN78";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-97RRFVQN78');
      };
    }
  }
});
