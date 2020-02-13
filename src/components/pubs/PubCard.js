import React from 'react'
import { Link } from 'react-router-dom'

const PubCard = ({ _id, name, image }) => (
  <>
    <Link to={`/pubs/${_id}`}>
      <div className="card">
        
        <div className="card-info">
          <h3>{name}</h3>
          {/* <p>Rating: {starRating}</p> */}
        </div>
        <div className="colour-header">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>
      </div>
    </Link>
  </>
)

export default PubCard