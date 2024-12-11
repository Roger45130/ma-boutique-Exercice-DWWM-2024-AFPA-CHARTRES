export const MainPanier = (datas) => {
    if (!datas || !datas.products) {
        console.error("Les données des produits sont manquantes ou incorrectes.");
        return '';
    }

    const productId = new URLSearchParams(window.location.search).get("id");
    const product = datas.products.find(p => p.id.toString() === productId);

    if (!product) {
        console.error("Produit introuvable.");
        return '<p>Produit non trouvé.</p>';
    }

    return `
        <main class="main">
            <h2 class="title__h2 DetailPanier">Détail de votre Panier</h2>
            <div class="tableauDetailPanier">
                <div class="DetailPanier__content">
                    <img src="Assets/Images/Products/${product.image}" alt="${product.alt}" class="Images__Article image" />
                </div>
                <div class="DetailPanier__content">
                    <h3 class="subtitle__h3 name">${product.name}</h3>
                </div>
                <div class="DetailPanier__content">
                    <h3 class="subtitle__h3 price">${product.price}</h3>
                </div>
                <div class="DetailPanier__content">
                    <h3 class="subtitle__h3 quantite"></h3>
                </div>
                <div class="DetailPanier__content">
                    <h3 class="subtitle__h3 total"></h3>
                </div>
            </div>
            <div class="TotalAPayer">
                <h3 class="subtitle__h3 titreTotal">TOTAL A PAYER</h3>
                <h3 class="subtitle__h3 montantTotal"></h3>
            </div>
        </main>
    `;
};