(function () {
  'use strict';

  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!input || !results) return;

  var posts = [];
  var jsonUrl = input.getAttribute('data-search-json') || '/search.json';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(items) {
    if (!items.length) {
      results.innerHTML = '<li class="search-empty">没有找到相关文章</li>';
      return;
    }

    results.innerHTML = items.map(function (post) {
      var meta = escapeHtml(post.date || '');
      if (post.tags) {
        meta += ' · ' + escapeHtml(post.tags);
      }
      return (
        '<li>' +
          '<h3><a href="' + escapeHtml(post.url) + '">' + escapeHtml(post.title) + '</a></h3>' +
          '<p>' + meta + '</p>' +
        '</li>'
      );
    }).join('');
  }

  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '';
      return;
    }

    var matched = posts.filter(function (post) {
      var haystack = [
        post.title || '',
        post.tags || '',
        post.content || ''
      ].join(' ').toLowerCase();
      return haystack.indexOf(q) !== -1;
    }).slice(0, 20);

    render(matched);
  }

  fetch(jsonUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      posts = data || [];
      input.addEventListener('input', function () {
        search(input.value);
      });
      if (input.value) {
        search(input.value);
      }
    })
    .catch(function () {
      results.innerHTML = '<li class="search-empty">搜索索引加载失败</li>';
    });
})();
