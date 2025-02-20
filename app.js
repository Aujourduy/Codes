// Ajout des clés Algolia
const searchClient = algoliasearch('Y4MR1NZHUG', 'e2c5211b0c5fd5bd468831b566fe0711');

// Initialiser Algolia InstantSearch
const search = instantsearch({
  indexName: 'Aujourduy', // Change par le nom de ton index
  searchClient
});



// Ajouter un widget pour la barre de recherche
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Rechercher une proposition...', // Texte dans la barre de recherche
    showReset: true,
    showSubmit: true,
    searchAsYouType: true, // Recherche instantanée
  })
);

// Ajouter un widget pour afficher les résultats
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      // Construction dynamique des résultats sous forme de cartes Bootstrap
      item(hit) {
        return `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <img src="${hit['Image URL'] || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${hit['Titre proposition'] || 'Image indisponible'}">
              <div class="card-body">
                <h5 class="card-title">${hit['Titre proposition'] || 'Titre indisponible'}</h5>
                <p class="card-text">
                  <strong>Animateur:</strong> ${hit['Animateur Pseudo'] || 'Non spécifié'} <br>
                  <strong>Ville:</strong> ${hit['Ville'] || 'Non spécifiée'} <br>
                  <strong>Date de début:</strong> ${hit['Date de début'] || 'Non spécifiée'}
                </p>
                <a href="${hit['Proposition URL'] || '#'}" class="btn btn-primary" target="_blank">Voir plus</a>
              </div>
            </div>
          </div>
        `;
      },
    },
  })
);

// Lancer InstantSearch 
search.start();
