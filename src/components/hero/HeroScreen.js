import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../selectors/getHeroesById';
import { heroImages } from '../../helpers/heroImages';


export const HeroScreen = () => {
  
  const { heroeId } = useParams();

  // "Cacheamos" el hero para que cada vez que se renderice y no cambie heroeId no vaya a recuperar el herobyid 
  const hero = useMemo( ()=>getHeroById(heroeId),[heroeId]);
  
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to='/' />
  }
  const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;
  // const imgPath = `/assets/${id}.jpg`;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img //src={imgPath}
          src={heroImages(`./${id}.jpg`)}
          alt={superhero}
          className=" img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8 animate__animated animate__fadeInLeft">
        <h3>{superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego:</b> {alter_ego}</li>
          <li className='list-group-item'><b>Publisher:</b> {publisher}</li>
          <li className='list-group-item'><b>Fist appearence:</b> {first_appearance}</li>
        </ul>
        <h5 className='mt-3'>Characters</h5>
        <p>{characters}</p>
        <button className='btn btn-danger' onClick={handleReturn}>
          Back

        </button>
      </div>
    </div>
  )
}
