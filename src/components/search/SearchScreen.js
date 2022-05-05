import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../hero/HeroCard';
import { getHeroesByName } from '../selectors/getHeroesByName';
import queryString from 'query-string';

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {q=''} = queryString.parse(location.search);
  
  const [{ searchText }, handleInputChange] = useForm({ searchText: q });
  const heroListFilter = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length === 0) {
      return;
    }
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="buscar un héroe"
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={handleInputChange}
            />
            <button
              className='btn btn-outline-primary mt-1 w-100'
              type='submit'>
              Buscar...
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />
          {
            q.trim().length === 0 
              ? <div className='alert alert-info'>Introduce un termino a buscar.</div>
              : (heroListFilter.length===0)
                  &&  <div className='alert alert-danger'>No hay resultados para la busqueda [{q}].</div>
          }
          {
            heroListFilter.map(heroe => (
              <HeroCard key={heroe.id} {...heroe} />
            ))
          }
        </div>
      </div>
    </>
  )
}
