const BASE_URL = "Data/data.json";

export const getData = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur :", error);
        throw new Error("Quelque chose ne va pas lors de la récupération des données.");
    }
};

export const getArticles = async () => {
    return await getData();
};

export const getTableauArticles = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get("id");

    const datas = await getArticles();

    if (!datas || !datas.products) {
        throw new Error("Les données des produits sont manquantes ou incorrectes.");
    }

    const product = datas.products.find(
        (item) => item.id.toString() === articleId
    );

    if (!product) {
        throw new Error("Produit introuvable avec l'ID spécifié.");
    }

    return product;
};
