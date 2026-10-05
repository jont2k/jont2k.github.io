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
    var send = document.getElementById('cf-send');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var url = form.getAttribute('data-ajax');
      if (!url) {
        status.textContent = 'This preview cannot send messages. The form works on the live site.';
        return;
      }
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      send.disabled = true;
      status.textContent = 'Sending…';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, body: j }; });
      }).then(function (res) {
        if (!res.ok || String(res.body.success) === 'false') throw new Error('not sent');
        form.reset();
        status.textContent = 'Message sent. I will reply to the email you gave.';
      }).catch(function () {
        status.textContent = 'The message did not send. Email me directly at jtwebsolution1@gmail.com.';
      }).then(function () { send.disabled = false; });
    });
  }
})();
