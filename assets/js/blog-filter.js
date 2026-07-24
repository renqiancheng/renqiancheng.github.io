(function () {
  'use strict';

  var list = document.getElementById('post-list');
  var sortSelect = document.getElementById('sort-select');
  var emptyEl = document.getElementById('filter-empty');
  var tagButtons = document.querySelectorAll('[data-filter-tag]');

  if (!list || !sortSelect) return;

  var activeTag = '';
  var cards = Array.prototype.slice.call(list.querySelectorAll('.post-card'));

  function setActiveButtons() {
    tagButtons.forEach(function (btn) {
      var value = btn.getAttribute('data-filter-tag') || '';
      btn.classList.toggle('is-active', value === activeTag);
    });
  }

  function apply() {
    var sort = sortSelect.value;
    var visible = cards.filter(function (card) {
      if (!activeTag) return true;
      var tags = (card.getAttribute('data-tags') || '').split(',');
      return tags.indexOf(activeTag) !== -1;
    });

    visible.sort(function (a, b) {
      var da = a.getAttribute('data-date') || '';
      var db = b.getAttribute('data-date') || '';
      return sort === 'oldest' ? da.localeCompare(db) : db.localeCompare(da);
    });

    cards.forEach(function (card) {
      card.hidden = true;
    });

    visible.forEach(function (card) {
      card.hidden = false;
      list.appendChild(card);
    });

    if (emptyEl) {
      emptyEl.hidden = visible.length > 0;
    }

    setActiveButtons();
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTag = btn.getAttribute('data-filter-tag') || '';
      apply();
    });
  });

  sortSelect.addEventListener('change', apply);
  apply();
})();
