import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';
import LoginModal from './LoginModal';
import VoidAnchar from '../../utils/anchor';

import './style.css';

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
              <VoidAnchar
                className={`navbar-burger burger ${
                  menuActive ? 'is-active' : ''
                }`}
                onClick={() => setMenuActive(!menuActive)}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </VoidAnchar>
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
                    <div className="navbar-item has-dropdown is-hoverable">
                      <VoidAnchar className="navbar-link">管理</VoidAnchar>
                      <div className="navbar-dropdown is-right">
                        <NavLink
                          className="navbar-item"
                          to="/admin/article"
                          activeClassName="is-active"
                        >
                          文章
                        </NavLink>
                        <NavLink
                          className="navbar-item"
                          to="/admin/user"
                          activeClassName="is-active"
                        >
                          用户
                        </NavLink>
                      </div>
                    </div>

                    <VoidAnchar
                      className="navbar-item"
                      onClick={() => {
                        Api.logout();
                        globalActions.setUser(null);
                        history.push('/');
                      }}
                    >
                      退出
                    </VoidAnchar>
                  </React.Fragment>
                ) : (
                  <VoidAnchar
                    className="navbar-item"
                    onClick={() => setLoginActive(true)}
                  >
                    登录
                  </VoidAnchar>
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
