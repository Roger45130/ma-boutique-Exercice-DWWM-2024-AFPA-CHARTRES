import { getArticles } from "../utils/Api.js";
import { Header } from "../components/Header.js";
import { Nav } from "../components/Nav.js";
import { MainPanier } from "../components/MainPanier.js";
import { Footer } from "../components/Footer.js";

const displayData = (datas) => {
    const body = document.querySelector("body");

    if (!datas) {
        console.error("Les données principales sont manquantes.");
        body.innerHTML = `<p>Erreur : Les données ne sont pas disponibles.</p>`;
        return;
    }

    body.innerHTML = `
        <div class="container__panier">
            ${Header()}
            ${Nav()}
            ${MainPanier(datas)}
            ${Footer()}
        </div>
    `;
};

(async () => {
    try {
        const datas = await getArticles();
        displayData(datas);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        document.querySelector("body").innerHTML = `<p>Erreur : Impossible de charger les données.</p>`;
    }
})();
