import React, {useState, useEffect} from "react";
import { PageArea, SearchArea } from './styled';

import useApi from '../../helpers/OlxApi';

import { PageContainer } from '../../components/MainComponents';
import { Link } from "react-router-dom";
import AdItem from "../../components/partials/AdItem/";

const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdLis] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, []);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      });
      setAdLis(json.ads);
    }
    getRecentAds();
  }, []);
 

  return(
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="POST" action="/ads" > 
              <input type="text" name="q" placeholder="O que você está procurando?"></input>
              <select name="state">
                <option>Selecione</option>
                {stateList.map((i,k) => 
                  <option key={k} value={i.name}>{i.name}</option>
                )}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>

          <div className="categoriesList">
            {categories.map((i,k) =>
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoriesItem">
                <img src={i.img} alt=""></img>
                <span>{i.name}</span>
              </Link>
            )}        
          </div>        

        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
         <h2>Anúncios Recentes</h2>     
         <div className="list">
              {adList.map((i,k) =>
                <AdItem key={k} data={i}/>  
              )}
         </div>

         <Link to="/ads" className="seeAllLink"> Ver Todos!</Link>

         <hr/>

         Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.

        </PageArea>
      </PageContainer>
    </>


    
  );
}

export default Page;