import React, {useState, useEffect} from "react";
import { PageArea, SearchArea } from './styled';

import useApi from '../../helpers/OlxApi';

import { PageContainer } from '../../components/MainComponents';

const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();

  return(
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="POST" action="/ads" > 
              <input type="text" name="q" placeholder="O que você está procurando?"></input>
              <select>

              </select>
              <button>Pesquisar</button>
            </form>
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          13213131231
        </PageArea>
      </PageContainer>
    </>


    
  );
}

export default Page;