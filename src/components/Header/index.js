import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.css';

export default function Header() {
  return (
    <section className="hero header is-info is-medium">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-end">
                <NavLink
                  className="navbar-item"
                  to="/"
                  activeClassName="is-active"
                >
                  首页
                </NavLink>
                <NavLink
                  className="navbar-item"
                  to="/login"
                  activeClassName="is-active"
                >
                  登录
                </NavLink>
                <NavLink
                  className="navbar-item"
                  to="/admin"
                  activeClassName="is-active"
                >
                  管理
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            <Link to="/">贝贝来了</Link>
          </h1>
          <h2 className="subtitle">闫心怡小宝贝成长记</h2>
        </div>
      </div>
    </section>
  );
}
