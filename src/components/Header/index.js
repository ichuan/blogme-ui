import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';
import LoginModal from './LoginModal';

import './header.css';

export default function Header() {
  const [globalState, globalActions] = useGlobal();
  const [menuActive, setMenuActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const history = useHistory();

  return (
    <section className="hero header is-info is-medium">
      <div className="hero-head">
        <nav className="navbar is-info">
          <div className="container">
            <div className="navbar-brand">
              <a
                href="# "
                className={`navbar-burger burger ${
                  menuActive ? 'is-active' : ''
                }`}
                onClick={() => setMenuActive(!menuActive)}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div className={`navbar-menu ${menuActive ? 'is-active' : ''}`}>
              <div className="navbar-end">
                {globalState.user ? (
                  <React.Fragment>
                    <NavLink
                      className="navbar-item"
                      to="/new"
                      activeClassName="is-active"
                    >
                      发布
                    </NavLink>
                    <NavLink
                      className="navbar-item"
                      to="/admin"
                      activeClassName="is-active"
                    >
                      管理
                    </NavLink>
                    <a
                      href="# "
                      className="navbar-item"
                      onClick={() => {
                        Api.logout();
                        globalActions.setUser(null);
                        history.push('/');
                      }}
                    >
                      退出
                    </a>
                  </React.Fragment>
                ) : (
                  <a
                    href="# "
                    className="navbar-item"
                    onClick={() => setLoginActive(true)}
                  >
                    登录
                  </a>
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
      <LoginModal
        isActive={loginActive}
        onClose={() => setLoginActive(false)}
        onLoggedin={user => {
          setLoginActive(false);
          globalActions.setUser(user);
        }}
      />
    </section>
  );
}
