(function () {
  var bar = document.getElementById('topbar');
  if (bar) {
    var update = function () {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      bar.classList.toggle('is-on', y > 320);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    document.getElementById('to-top').addEventListener('click', function () {
      var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
    });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('cf-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-mailto');
      var name = document.getElementById('cf-name').value.trim();
      var message = document.getElementById('cf-message').value.trim();
      var url = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Portfolio message from ' + name) +
        '&body=' + encodeURIComponent((message + '\n\n' + name).replace(/\r?\n/g, '\r\n'));
      status.textContent = 'Your mail app should open with the message ready to send. If nothing opens, email ' + to + ' directly.';
      window.location.href = url;
    });
  }
})();
