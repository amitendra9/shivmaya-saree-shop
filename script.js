(function () {
  'use strict';

  var lang = 'en';
  var html = document.documentElement;
  var langLabel = document.getElementById('langLabel');

  // Range search
  var searchInput = document.getElementById('rangeSearch');
  var rangeList = document.getElementById('rangeList');
  var rangeCount = document.getElementById('rangeCount');
  var rangeEmpty = document.getElementById('rangeEmpty');
  var rangeItems = rangeList ? Array.prototype.slice.call(rangeList.querySelectorAll('li')) : [];

  rangeItems.forEach(function (li) { li.className = 'range-item'; });

  function visibleCount() {
    return rangeItems.filter(function (li) { return !li.hasAttribute('hidden'); }).length;
  }

  function updateCount() {
    if (!rangeCount) return;
    var n = visibleCount();
    rangeCount.innerHTML = lang === 'hi' ? n + ' संग्रह मिले' : n + ' collections found';
  }

  function filterRange() {
    if (!searchInput) return;
    var q = searchInput.value.trim().toLowerCase();
    var any = false;

    rangeItems.forEach(function (li) {
      var match = q === '' || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.hidden = !match;
      if (match) any = true;
    });

    if (rangeEmpty) rangeEmpty.hidden = any;
    updateCount();
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterRange);
  }

  function applyLang() {
    html.setAttribute('lang', lang);
    langLabel.textContent = lang === 'en' ? 'हिंदी' : 'English';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var used = el.getAttribute('data-' + lang);
      if (used !== null) {
        el.innerHTML = used;
      }
    });

    if (searchInput) {
      var ph = searchInput.getAttribute('data-' + lang + '-placeholder');
      if (ph !== null) searchInput.placeholder = ph;
    }

    updateCount();
  }

  document.getElementById('langToggle').addEventListener('click', function () {
    lang = lang === 'en' ? 'hi' : 'en';
    applyLang();
  });

  // Mobile menu
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  applyLang();
})();