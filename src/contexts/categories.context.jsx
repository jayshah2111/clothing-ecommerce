import { createContext, useEffect, useState } from "react";
//import PRODUCTS from '../shop-data.json';
//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
//import SHOP_DATA from '../shop-data';
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState([]);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
      }, []);

    const value = { categoriesMap };
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}