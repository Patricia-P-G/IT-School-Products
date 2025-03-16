import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../store/Theme/context';
import { setDarkTheme, setLightTheme } from '../store/Theme/actions';
import { addToCart } from "../store/Cart/actions";
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions'


export function Home() {
  // Ne folosim de useContex va sa avem acces la store-ul pentru tema
  const {themeState, themeDispatch} = useContext(ThemeContext);
  // Vom extrage de pe useContext doar functia de dispatch, deoarece pe homepage
  // nu afisam date despre produsele din cart:
  const {cartDispatch} = useContext(CartContext);
  const {favoritesDispatch} = useContext(FavoritesContext);
  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  // Extragem valoarea theme-ului de pe state
  const theme = themeState.theme


  function handleThemeChange(){
    // Schimabm tema cand dam click pe button si in functie de valoarea temei
    // din store vom declansa actiunea de schimbare a state-ului
    let actionResult;
    if(theme === "light"){
      actionResult = setDarkTheme();
      themeDispatch(actionResult);
    }
    else if(theme === "dark"){
      actionResult = setLightTheme();
      themeDispatch(actionResult)
    }
  }

  function handleAddToCart(product){
    // Apelam actiunea care ne permite sa adaugam in cart si trimitem payload-ul aferent
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer (care ne permite sa modificam state-ul)
    cartDispatch(actionResult);
  }

  function handleAddToFavorites(product){
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }


  // Afisam pe ecran produsele venite de la API.
  return (
    <div className= {theme === "light" ? "px-2 bg-white" : "px-2 bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        {/* Afisam un button care sa ne permita sa schimbam tema: */}
        <Button 
          variant='outline-primary'
          className='mt-3'
          onClick={handleThemeChange}
        >Change Theme</Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url. */}
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button variant="success" onClick={()=> {
                // Construim payload-ul si il pasam ca argument catre o functie 
                // ce va modifica state-ul pt cart
                handleAddToCart({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                })
              }}>Adaugă în coș</Button>
              <Button variant="outline-success" onClick={()=> {
                handleAddToFavorites({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                })
              }}>Adaugă la favorite</Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
