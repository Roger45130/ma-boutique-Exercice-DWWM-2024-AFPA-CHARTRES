export const MainProduct = (datas) => {
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
            <section class="presentation">
                <h2 class="title__h2 name">${product.name}</h2>

                <div class="product__content">
                    <div class="article__picture__content">
                        <img src="Assets/Images/Products/${product.image}" alt="${product.alt}" class="Images__Article image">
                    </div>
                    <div class="article__description__content">
                        <h3 class="subtitle__h3 title">${product.title}</h3>
                        <div class="reference">
                            <h4 class="title__h4">Référence :</h4>
                            <h4 class="title__h4 id">${product.id}</h4>
                        </div>
                        <div class="indicateurPrix">
                            <h4 class="title__h4">Prix :</h4>
                            <h4 class="title__h4 price">${product.price}</h4>
                        </div>
                        <span class="description">${product.description}</span>
                        <div class="quantite__wrapper">
                            <p class="quantite__article">Qtés :</p>
                            <select name="Quantite" id="quantite__select">
                            <option value="" class="quantite">---- Quantités ----</option>
                            <option value="1" class="quantite">1</option>
                            <option value="2" class="quantite">2</option>
                            <option value="3" class="quantite">3</option>
                            <option value="4" class="quantite">4</option>
                            <option value="plus" class="quantite">
                                Plus ? Vous devez être STUPIDE !
                            </option>
                            </select>
                        </div>
                        <button class="btnAjoutPanier" onclick="window.location.href='panier.html'">Ajouter au panier</button>
                    </div>
                </div>
            </section>
        </main>
    `;
};