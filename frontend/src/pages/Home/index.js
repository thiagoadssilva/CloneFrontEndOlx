import React, {useState, useEffect} from "react";
import { PageArea, SearchArea } from './styled';

import useApi from '../../helpers/OlxApi';

import { PageContainer } from '../../components/MainComponents';
import { Link } from "react-router-dom";

const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);

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
         ...
        </PageArea>
      </PageContainer>
    </>


    
  );
}

export default Page;