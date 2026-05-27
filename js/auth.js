(function () {
  /* ── Change this to set the password ── */
  const SOILX_PASSWORD = 'soilx2026';
  const SESSION_KEY    = 'soilx_auth';

  function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }

  function unlock() {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }

  /*
   * initGate(gateId, contentId)
   *
   * gateId   — the id of the .password-gate element (the lock screen)
   * contentId — the id of the element to reveal on success
   *             pass null to reveal all .protected-content elements
   */
  window.SoilXAuth = {
    initGate: function (gateId, contentId) {
      const gate    = document.getElementById(gateId);
      const content = contentId
        ? document.getElementById(contentId)
        : document.querySelectorAll('.protected-content');

      if (!gate) return;

      /* Already authenticated this session — skip gate */
      if (isAuthenticated()) {
        gate.style.display = 'none';
        if (content) {
          if (content.forEach) {
            content.forEach(el => el.style.display = 'block');
          } else {
            content.style.display = 'block';
          }
        }
        return;
      }

      /* Wire up the form */
      const form  = gate.querySelector('.pg-form');
      const input = gate.querySelector('.pg-input');
      const error = gate.querySelector('.pg-error');

      if (!form || !input) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value.trim() === SOILX_PASSWORD) {
          unlock();
          gate.style.transition = 'opacity 0.35s';
          gate.style.opacity = '0';
          setTimeout(function () {
            gate.style.display = 'none';
            if (content) {
              if (content.forEach) {
                content.forEach(el => {
                  el.style.display = 'block';
                  el.style.animation = 'fadeIn 0.4s ease';
                });
              } else {
                content.style.display = 'block';
                content.style.animation = 'fadeIn 0.4s ease';
              }
            }
          }, 350);
        } else {
          if (error) {
            error.textContent = 'Incorrect password. Please try again.';
            error.style.display = 'block';
          }
          input.value = '';
          input.focus();
        }
      });
    }
  };
})();
