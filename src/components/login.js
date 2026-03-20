import React from 'react'

const login = () => {
  return (
    <div className='container'>
      <div className="mb-3 row">
        <label for="inputName" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputEmail" />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword" />
        </div>
      </div>
    </div>
  )
}

export default login
