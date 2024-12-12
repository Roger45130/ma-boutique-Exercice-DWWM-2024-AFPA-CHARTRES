export const MainPanier = (datas) => {
    if (!datas || !datas.products) {
        console.error("Les données des produits sont manquantes ou incorrectes.");
        return '<p>Erreur : Les données ne sont pas disponibles.</p>';
    }

    // Récupérer les produits du localStorage
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    const displayPanier = () => {
        if (panier.length === 0) {
            return '<p>Votre panier est vide.</p>';
        }

        return panier.map((product) => {
            return `
                <main class="main">
                    <div class="tableauDetailPanier">
                        <div class="DetailPanier__content">
                            <h3 class="etiquette__panier">Visuel</h3>
                            <img src="Assets/Images/Products/${product.image}" alt="${product.alt}" class="Images__Article image" />
                        </div>
                        <div class="DetailPanier__content">
                            <h3 class="etiquette__panier">Article</h3>
                            <h3 class="subtitle__h3 name">${product.name}</h3>
                        </div>
                        <div class="DetailPanier__content">
                            <h3 class="etiquette__panier">Prix</h3>
                            <h3 class="subtitle__h3 price">${product.price}</h3>
                        </div>
                        <div class="DetailPanier__content">
                            <h3 class="etiquette__panier">Quantité(s)</h3>
                            <div class="quantite">
                                <h4 class="title__h4">
                                    <i class="fa-solid fa-minus icon__moins" data-id="${product.id}"></i>
                                </h4>
                                <h3 class="subtitle__h3 quantite-value">${product.quantity}</h3>
                                <h4 class="title__h4">
                                    <i class="fa-solid fa-plus icon__plus" data-id="${product.id}"></i>
                                </h4>
                            </div>
                        </div>
                        <div class="DetailPanier__content">
                            <h3 class="etiquette__panier">Total</h3>
                            <h3 class="subtitle__h3 total">${(parseFloat(product.price) * product.quantity).toFixed(2)} €</h3>
                        </div>
                    </div>
                </main>
            `;
        }).join('');
    };

    const calculateTotal = () => {
        return panier.reduce((total, product) => {
            return total + parseFloat(product.price) * product.quantity;
        }, 0).toFixed(2);
    };

    return `
        <main class="main">
            <h2 class="title__h2 DetailPanier">Détail de votre Panier</h2>
            <div id="tableauDetailPanier" class="tableauDetailPanier">
                ${displayPanier()}
            </div>
            <div class="TotalAPayer">
                <h3 class="subtitle__h3 titreTotal">TOTAL A PAYER</h3>
                <h3 id="montantTotal" class="subtitle__h3 montantTotal">${calculateTotal()} €</h3>
            </div>
            <div class="annuleValide">
                <button class="btnAnnuler" id="btnAnnuler">Annuler le panier</button>
                <button class="btnValider" id="btnValider">Valider le panier</button>
            </div>
        </main>
    `;
};

// Gestion des boutons pour incrémenter ou décrémenter les quantités
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("icon__plus")) {
        const productId = event.target.getAttribute("data-id");
        updatePanier(productId, 1);
    } else if (event.target.classList.contains("icon__moins")) {
        const productId = event.target.getAttribute("data-id");
        updatePanier(productId, -1);
    }
});

const updatePanier = (productId, quantityChange) => {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const productIndex = panier.findIndex((p) => p.id.toString() === productId);

    if (productIndex > -1) {
        panier[productIndex].quantity += quantityChange;
        if (panier[productIndex].quantity <= 0) {
            panier[productIndex].quantity = 0;
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        location.reload(); // Rafraîchir la page pour mettre à jour l'affichage
    }
};

// Gestion de l'annulation du panier
document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("btnAnnuler").addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir vider le panier ?")) {
            localStorage.removeItem("panier");
            document.getElementsByClassName("tableauDetailPanier").innerHTML = "";
            document.getElementsByClassName("montantTotal").textContent = "0.00 €";
            alert("Votre panier a été vidé.");
        }
    });

    // Gestion de la validation du panier
    document.getElementsByClassName("btnValider").addEventListener("click", () => {
        alert("Votre commande a été validée !");
        localStorage.removeItem("panier");
        location.href = "index.html";
    });
});