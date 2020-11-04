import React, {useState, useEffect} from "react";
import { PageArea} from './styled';

import useApi from '../../helpers/OlxApi';

import { PageContainer } from '../../components/MainComponents';
import { useLocation, useHistory } from "react-router-dom";
import AdItem from "../../components/partials/AdItem/";

let timer;

const Page = () =>{  
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();
  const history = useHistory();

  // INICIO - Aqui estamos pegando o conteúdo que está sendo pasado na URL
  const useQueryString = () =>{
    return new URLSearchParams(useLocation().search);
  }
  const query = useQueryString();

  const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
  const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
  const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');
  // FIM - Aqui estamos pegando o conteúdo que está sendo pasado na URL

  const [currentPage, setCurrentPage] = useState(1);
  const [adsTotal, setAdsTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);  
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  const [resultOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState();

  const getAdsList = async () =>{    
    setLoading(true);
    let offset = (currentPage - 1) * 9;
    const json = await api.getAds({
      sort: 'desc',
      limit: 9,
      q,
      cat,
      state,
      offset
    });
    setAdList(json.ads);
    setAdsTotal(json.total)
    setResultOpacity(1);
    setLoading(false);
  }

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

  useEffect(() =>{
    if(adList.length > 0){
      setPageCount(Math.ceil(adsTotal / adList.length));
    }else{
      setPageCount(0);
    }
  }, [adsTotal])

  useEffect(() => {
    setResultOpacity(0.3);
    getAdsList();
  },[currentPage]);

  useEffect(() =>{
    let queryString = [];

    if(q){
      queryString.push(`q=${q}`);
    }
    if(cat){
      queryString.push(`q=${cat}`);
    }
    if(state){
      queryString.push(`q=${state}`);
    }

    history.replace({
      search: `?${queryString.join('&')}`
    });

    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    setCurrentPage(1);
  }, [q, cat, state]);

  let pagination = [];
  for(let i=1; i<=pageCount; i++){
    pagination.push(i);
  }
 

  return(
  <PageContainer>
    <PageArea>
      <div className="leftSide">
        <form method="GET">
          
          <input 
            type="text" 
            name="q" 
            placeholder="Oque você está procurando"
            value={q}
            onChange={e => setQ(e.target.value)}
          ></input>

          <div className="filterName">Estado:</div>
          <select name="state" value={state} onChange={e => setState(e.target.value)}>
            <option>Selecione</option>
            {stateList.map((i,k) =>
              <option key={k} value={i.name}>{i.name}</option>
            )}
          </select>

          <div className="filterName">Categoria:</div>
          <ul>
              {categories.map((i,k) =>
                <li 
                  key={k} 
                  className={cat == i.slug?'categoryItem active':'categoryItem'}
                  onClick={() => setCat(i.slug)}>
                  <img src={i.img} alt=""></img>
                  <span>{i.name}</span>
                </li>
              )}
          </ul>


        </form>
      </div>
      <div className="rightSide">
        <h2>Resultados</h2>
        {loading && adList.length === 0 &&
          <div className="listWarning">Carregando...</div>
        }
        {!loading && adList.length === 0 &&
          <div className="listWarning">Nenhum resultado foi encontrado!!</div>
        }

        <div className="list" style={{opacity:resultOpacity}}>
          {adList.map((i,k) =>
            <AdItem key={k} data={i} controle = {0}/>
          )}        
        </div>

        <div className="paginationn">
          {pagination.map((i,k) =>
            <div onClick={(() => setCurrentPage(i))} className={i === currentPage?'pagItem active': 'pagItem'} >{i}</div>
          )}
        </div>    

      </div>
    </PageArea>
  </PageContainer>    
  );
}

export default Page;