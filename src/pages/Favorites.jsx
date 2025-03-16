import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { FavoritesContext } from "../store/Favorites/context";
import { removeFromFavorites } from "../store/Favorites/actions";

export function Favorites() {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  function handleRemoveProduct(id){
    const actionResult = removeFromFavorites(id);
    favoritesDispatch(actionResult);
  }

  return (
    <div className="mx-2">
      {favoritesState.products.length === 0 ? (
        <p>Momentan nu sunt produse la favorite</p>
      ) : (
        favoritesState.products.map((product) => {
          return (
            <div className="m-3" key={product.id}>
              <div
                className="d-flex align-items-center 
                 justify-content-between mb-3">
                  <img src={product.image} alt='product image'/>
                  <strong>{product.name}</strong>
                  <strong>{product.price}$</strong>
                 </div>
                 <Button variant='danger' onClick={()=> handleRemoveProduct(product.id)}>Șterge</Button>
            </div>
          );
        })
      )}
    </div>
  );
}
