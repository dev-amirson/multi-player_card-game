import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" >CardGame</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Create Game <span class="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/PlayGame">Join Game</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
