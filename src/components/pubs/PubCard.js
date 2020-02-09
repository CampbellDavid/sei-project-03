import React from 'react'
import { Link } from 'react-router-dom'


const PubCard = ({ _id, name, image, starRating }) => (
  <section className="column">
    <Link to={`/pubs/${_id}`}>

      <div>

        <h2 className="header">{name}</h2>
        
        <p>Rating: {starRating}</p>

        <div className="card-image">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>

      </div>

    </Link>
  </section>
)

export default PubCard