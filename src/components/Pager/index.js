import React from 'react';

const reloadWithScrollToTop = fn => {
  return params => {
    fn(params);
    window.scrollTo(0, 0);
  };
};

export default ({ items, curParams, onClick, limit, idKey }) => {
  limit = limit || 10;
  idKey = idKey || 'id';
  const reload = reloadWithScrollToTop(onClick);
  if (!items || (!items.length && !curParams.starting_after)) {
    return '';
  }
  const hasNext = curParams.ending_before || items.length === limit,
    hasPrevious =
      curParams.starting_after ||
      (curParams.ending_before && items.length === limit),
    minId = Math.min(...items.map(i => i[idKey])),
    maxId = Math.max(...items.map(i => i[idKey]));

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        <li>
          <button
            className="button pagination-link"
            disabled={!hasPrevious}
            onClick={() => reload({ limit, ending_before: maxId })}
          >
            上一页
          </button>
        </li>
        <li>
          <button
            className="button pagination-link"
            disabled={!hasNext}
            onClick={() => reload({ limit, starting_after: minId })}
          >
            下一页
          </button>
        </li>
      </ul>
    </nav>
  );
};
