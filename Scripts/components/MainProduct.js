export const MainProduct = (datas) => {
    if (!datas || !datas.products) {
        console.error("Les données des produits sont manquantes ou incorrectes.");
        return '<p>Erreur : Les données ne sont pas disponibles.</p>';
    }

    const productId = new URLSearchParams(window.location.search).get("id");
    const product = datas.products.find((p) => p.id.toString() === productId);

    if (!product) {
        console.error("Produit introuvable.");
        return '<p>Produit non trouvé.</p>';
    }

    const addToPanier = (product) => {
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        const existingProductIndex = panier.findIndex((p) => p.id === product.id);

        if (existingProductIndex > -1) {
            panier[existingProductIndex].quantity += 1;
        } else {
            panier.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        alert(`${product.name} a été ajouté au panier.`);
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("addToPanierBtn").addEventListener("click", () => {
            addToPanier(product); // Ajoute le produit au panier
            window.location.href = "panier-old.html"; // Redirection après ajout
        });
    });

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
                        <button class="btnAjoutPanier" id="addToPanierBtn">Ajouter au panier</button>
                    </div>
                </div>
            </section>
        </main>
    `;
};
