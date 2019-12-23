import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';

import './header.css';

export default function Header() {
  const [globalState, globalActions] = useGlobal();

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
                  exact
                  activeClassName="is-active"
                >
                  首页
                </NavLink>
                {globalState.user ? (
                  <React.Fragment>
                    <NavLink
                      className="navbar-item"
                      to="/admin"
                      activeClassName="is-active"
                    >
                      管理
                    </NavLink>
                    <NavLink
                      className="navbar-item"
                      to="/logout"
                      activeClassName="is-active"
                      onClick={() => {
                        Api.logout();
                        globalActions.setUser(null);
                      }}
                    >
                      退出
                    </NavLink>
                  </React.Fragment>
                ) : (
                  <NavLink
                    className="navbar-item"
                    to="/login"
                    activeClassName="is-active"
                  >
                    登录
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            <Link to="/">{globalState.config['site.name']}</Link>
          </h1>
          <h2 className="subtitle">{globalState.config['site.desc']}</h2>
        </div>
      </div>
    </section>
  );
}
