import React from 'react';
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  const arr = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous People', id: 'famous-people'},
    {title: 'Harry Potter', id: 'harry-potter'},
    {title: 'Lord of the Rings', id: 'lotr'},
    {title: 'Big Lebowski', id: 'big-lebowski'},
  ];

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
            <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
              <li className="nav-item">
                <NavLink to="/all" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">All</span>
                </NavLink>
              </li>
              {arr.map(link => (<li key={Math.random()} className="nav-item">
                  <NavLink to={"/quotes/" + link.id} className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">{link.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;