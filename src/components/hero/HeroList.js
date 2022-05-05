import React, { useMemo, useState } from 'react'
import { getHeroesByPublisher } from '../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({publisher}) => {
    
  
 
    const [search,setSearch] = useState('');
    
    const heroes = useMemo(()=>{
      if (search.trim().length === 0){
          return getHeroesByPublisher(publisher);
      }else{
        return getHeroesByPublisher(publisher).filter(h=>h.superhero.toLocaleLowerCase().includes(search));
      }

    },[publisher,search]);

    const handleInputChange = (e)=>{
      setSearch(e.target.value);    
    };
    const placeHolder = `${publisher} superhero`;
  return (
    <>
      <div className="d-flex flex-row-reverse mb-1">
        <div className="mt-auto bd-highlight ">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
            <input
                  type='text'
                  name='search'
                  value={search}
                  onChange={handleInputChange}
                  placeholder={placeHolder}
                  className='form-control' aria-describedby="inputGroup-sizing-default"
          />
          
          </div>
        </div>
      </div>
      <div className='row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>
        {
            search.trim().length !== 0 && 
              (heroes.length === 0) &&  <div className='alert alert-danger w-100'>No hay resultados para la busqueda [{search}].</div>
        }
        {
            heroes.map(heroe => (
              <HeroCard key={heroe.id} {...heroe}/>
              ))
          }

      </div>
    </>
  ) 
}
    