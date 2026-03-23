import React from 'react'

const productcard = (props) => {
  const { id,title, description,price, img } = props;
  return (
    <div className='container'>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={img} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><strong>Price: </strong>{price}</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        <i className="bi bi-trash3" onClick={() => props.deleteProduct(id)}></i>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default productcard
