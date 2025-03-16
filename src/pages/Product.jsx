import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Product() {
  // Extragem functia de pe state care ne permite sa modificam cart-ul
  const { cartDispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);
  // Preluam parametrul din URL.
  let { id } = useParams();
  // In url, id-ul este codificat cu functia encodeURI. Il decodam.
  id = decodeURI(id);
  // Cerem produsul de la API si actualizam state-ul.
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  // Extragem datele de inters din produs.
  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  function handleAddToCart(product){
    // Apelam funcntion cu actiunea aferenta adaugarii
    const actionResult = addToCart(product);
    // Trimitem catre reducer rezulattul actiunii de mai sus
    cartDispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }

  return (
    // Afisam datele despre produs pe ecran.
    <div className="d-flex my-3 mx-2">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button variant="success"
        onClick={()=>{
          handleAddToCart({
            id, 
            image: thumb,
            name: name,
            price: retailPrice
          })
        }}>Adaugă în coș</Button>
        <Button variant="outline-success"
        onClick={()=>{
          handleAddToCart({
            id, 
            image: thumb,
            name: name,
            price: retailPrice
          })
        }}>Adaugă în favorite</Button>
      </div>
    </div>
  );
}
