// Definim un state initial - care ca avea ca valoare un array gol pentru produse

export const initialState = {
    products: [],
};

export function cartReducer(state, action){
    switch(action.type) {
        case "ADD_TO_CART": {
            let updatedProducts;
            let newState;
            // Verificam daca produsul exista deja in cos
            const foundProduct = state.products.find((product) => {
                return product.id === action.payload.id
            });
            // Daca produsul exista atunci ii marim cantitatea cu 1
            if(foundProduct){
                // ATENTIE - trebuie sa modificam cantitatea fara sa modificam state-ul initia - inseamna ca
                // va trebui sa folosim un map
                updatedProducts = state.products.map((product) => {
                    // Daca produsul este cel cautat atunci returnam un nou produs cu cantitatea modificata:
                    if(product.id === foundProduct.id) {
                        return{
                            // Copiem continutul produsul anterior
                            ...product,
                            // Afisam si cantitatea din state-ul anterior +1
                            quantity: product.quantity + 1
                        }
                    } else {
                        // Daca produsul nu este cel cautat, atunci nu avem nimic nou adaugat deci returnam product
                        return product;
                    }
                })
            } else {
                // Daca produsul adaugat in cos nu exista deja, atunci il adaugam la sfarsit:
                updatedProducts = [
                    // Avem grija ca acest nou array sa nu il modifice pe ala vechi
                    ...state.products,
                    {
                        ...action.payload,
                        // Fiind prima data cand produsul este adaugat in cos, atunci ii punem si cantitatea egala cu 1
                        quantity: 1,
                    }
                ]
            }

            // Creeam noul state ce contine produsele actualizate
            newState = {
                products: updatedProducts,
            }
            // Returnam noul state
            return newState;
        }
        case "REMOVE_FROM_CART": {
            // Pentru a sterge un produs trebuie sa filtram produsele din state de unde excludem produsul ce se vrea sters
            const filteredProducts = state.products.filter((product) =>{
                return product.id !== action.payload
            });

            // Mai jos avem noul state ce va fi returnar
            return {
                products: filteredProducts,
            };
        }

        // Nu uitam ca trebuie sa adaugam si default
        default:
             return state;
    }
}