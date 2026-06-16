/* ============================================================
   YATEX — Quote Configurator
   4-step wizard. State machine, validation, smooth step transitions.
   Targets #yatex-cfg. Re-translates on langchange.
   ============================================================ */
(function () {
  const t = (k) => (window.YATEX_I18N ? window.YATEX_I18N.t(k, currentLang()) : k);
  const currentLang = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');

  const CATEGORIES = [
    { id: 'summer', key: 'products.cat.summer' },
    { id: 'winter', key: 'products.cat.winter' },
    { id: 'men',    key: 'products.cat.men' },
    { id: 'women',  key: 'products.cat.women' },
    { id: 'kids',   key: 'products.cat.kids' },
    { id: 'shoes',  key: 'products.cat.shoes' },
    { id: 'acc',    key: 'products.cat.acc' },
    { id: 'mixed',  key: 'products.cat.mixed' }
  ];

  const VOLUMES = [
    { id: '1c',  key: 'cfg.vol.1' },
    { id: '25c', key: 'cfg.vol.2' },
    { id: '510c',key: 'cfg.vol.3' },
    { id: 'lt',  key: 'cfg.vol.4' }
  ];

  const MARKETS = [
    { id: 'local',   key: 'cfg.market.local' },
    { id: 'africa',  key: 'cfg.market.africa' },
    { id: 'maghreb', key: 'cfg.market.maghreb' },
    { id: 'middle',  key: 'cfg.market.middle' },
    { id: 'europe',  key: 'cfg.market.europe' },
    { id: 'other',   key: 'cfg.market.other' }
  ];

  const state = {
    step: 0,
    category: null,
    volume: null,
    market: null,
    country: '',
    fullname: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  };

  let rootEl = null;

  function el(tag, attrs = {}, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'dataT') e.dataset.t = v;
      else e.setAttribute(k, v);
    }
    for (const k of kids) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  }

  function progress() {
    const bar = rootEl.querySelector('.cfg-progress-bar');
    const lbl = rootEl.querySelector('.cfg-step-label');
    if (!bar || !lbl) return;
    const pct = (state.step / 3) * 100;
    bar.style.width = pct + '%';
    lbl.textContent = `${t('cfg.step')} ${Math.min(state.step + 1, 4)} / 4`;
  }

  function rerenderActiveStep() {
    rootEl.querySelectorAll('.cfg-step').forEach((s, i) => {
      s.classList.toggle('active', i === state.step);
    });
    rerenderSummary();
    progress();
    const nextBtn = rootEl.querySelector('.cfg-next');
    const backBtn = rootEl.querySelector('.cfg-back');
    if (backBtn) backBtn.style.visibility = state.step === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.innerHTML = state.step === 3
      ? `${t('cfg.submit')} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>`
      : `${t('cfg.next')} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>`;
  }

  function rerenderSummary() {
    const sum = rootEl.querySelector('.cfg-summary');
    if (!sum) return;
    const items = [];
    if (state.category) {
      const cat = CATEGORIES.find(c => c.id === state.category);
      items.push({ k: t('cfg.summary.cat'), v: t(cat.key) });
    }
    if (state.volume) {
      const vol = VOLUMES.find(v => v.id === state.volume);
      items.push({ k: t('cfg.summary.vol'), v: t(vol.key) });
    }
    if (state.market || state.country) {
      const mk = state.market ? t(MARKETS.find(m => m.id === state.market).key) : '';
      const co = state.country ? ` · ${state.country}` : '';
      items.push({ k: t('cfg.summary.dest'), v: mk + co });
    }
    sum.innerHTML = items.length
      ? items.map(it => `
          <div class="cfg-sum-row">
            <span class="cfg-sum-k">${it.k}</span>
            <span class="cfg-sum-v">${it.v}</span>
          </div>`).join('')
      : `<div class="cfg-sum-empty">${t('cfg.summary')}</div>`;
  }

  function validateStep() {
    rootEl.querySelector('.cfg-error')?.classList.remove('show');
    switch (state.step) {
      case 0: return !!state.category;
      case 1: return !!state.volume;
      case 2: return !!state.market;
      case 3: return !!(state.fullname && state.email);
    }
    return true;
  }

  function go(dir) {
    if (dir > 0) {
      if (!validateStep()) {
        const err = rootEl.querySelector('.cfg-error');
        err.textContent = t('cfg.required');
        err.classList.add('show');
        return;
      }
      if (state.step === 3) {
        submit();
        return;
      }
      state.step = Math.min(3, state.step + 1);
    } else {
      state.step = Math.max(0, state.step - 1);
    }
    rerenderActiveStep();
  }

  function submit() {
    const wrap = rootEl.querySelector('.cfg-wrap');
    const ok   = rootEl.querySelector('.cfg-success');
    wrap.style.display = 'none';
    ok.classList.add('show');
  }

  function chip(label, isOn, onClick) {
    return el('button', {
      type: 'button',
      class: 'cfg-chip' + (isOn ? ' on' : ''),
      onclick: onClick
    }, label);
  }

  function rebuild() {
    if (!rootEl) return;

    const stepsWrap = rootEl.querySelector('.cfg-steps');
    if (!stepsWrap) return;
    stepsWrap.innerHTML = '';

    // ---------- Step 1: category ----------
    const s1 = el('div', { class: 'cfg-step' + (state.step === 0 ? ' active' : '') });
    s1.appendChild(el('div', { class: 'cfg-stepnum' }, '01'));
    s1.appendChild(el('h3', {}, t('cfg.s1.title')));
    s1.appendChild(el('p', { class: 'cfg-help' }, t('cfg.s1.help')));
    const grid1 = el('div', { class: 'cfg-cat-grid' });
    CATEGORIES.forEach(c => {
      const card = el('button', {
        type: 'button',
        class: 'cfg-cat' + (state.category === c.id ? ' on' : ''),
        onclick: () => { state.category = c.id; rebuild(); }
      });
      card.appendChild(el('span', { class: 'cfg-cat-dot' }));
      card.appendChild(el('span', { class: 'cfg-cat-name' }, t(c.key)));
      grid1.appendChild(card);
    });
    s1.appendChild(grid1);
    stepsWrap.appendChild(s1);

    // ---------- Step 2: volume ----------
    const s2 = el('div', { class: 'cfg-step' + (state.step === 1 ? ' active' : '') });
    s2.appendChild(el('div', { class: 'cfg-stepnum' }, '02'));
    s2.appendChild(el('h3', {}, t('cfg.s2.title')));
    s2.appendChild(el('p', { class: 'cfg-help' }, t('cfg.s2.help')));
    const grid2 = el('div', { class: 'cfg-vol-grid' });
    VOLUMES.forEach(v => {
      const card = el('button', {
        type: 'button',
        class: 'cfg-vol' + (state.volume === v.id ? ' on' : ''),
        onclick: () => { state.volume = v.id; rebuild(); }
      });
      card.appendChild(el('span', { class: 'cfg-vol-text' }, t(v.key)));
      grid2.appendChild(card);
    });
    s2.appendChild(grid2);
    stepsWrap.appendChild(s2);

    // ---------- Step 3: destination ----------
    const s3 = el('div', { class: 'cfg-step' + (state.step === 2 ? ' active' : '') });
    s3.appendChild(el('div', { class: 'cfg-stepnum' }, '03'));
    s3.appendChild(el('h3', {}, t('cfg.s3.title')));
    s3.appendChild(el('p', { class: 'cfg-help' }, t('cfg.s3.help')));
    const chips = el('div', { class: 'cfg-chips' });
    MARKETS.forEach(m => {
      chips.appendChild(chip(t(m.key), state.market === m.id, () => {
        state.market = m.id; rebuild();
      }));
    });
    s3.appendChild(chips);
    const countryField = el('div', { class: 'cfg-field cfg-field-country' });
    countryField.appendChild(el('label', {}, t('cfg.field.country')));
    const countryInput = el('input', {
      type: 'text', value: state.country,
      placeholder: currentLang() === 'en' ? 'e.g. Senegal, Algeria…' : 'ex. Sénégal, Algérie…'
    });
    countryInput.addEventListener('input', e => { state.country = e.target.value; rerenderSummary(); });
    countryField.appendChild(countryInput);
    s3.appendChild(countryField);
    stepsWrap.appendChild(s3);

    // ---------- Step 4: contact ----------
    const s4 = el('div', { class: 'cfg-step' + (state.step === 3 ? ' active' : '') });
    s4.appendChild(el('div', { class: 'cfg-stepnum' }, '04'));
    s4.appendChild(el('h3', {}, t('cfg.s4.title')));
    s4.appendChild(el('p', { class: 'cfg-help' }, t('cfg.s4.help')));

    function field(name, key, type, required, placeholder) {
      const f = el('div', { class: 'cfg-field' });
      f.appendChild(el('label', {}, t(key) + (required ? ' *' : '')));
      const i = el(type === 'textarea' ? 'textarea' : 'input', {
        type: type === 'textarea' ? '' : type,
        placeholder: placeholder || '',
        value: state[name] || ''
      });
      if (type === 'textarea') {
        i.removeAttribute('type');
        i.setAttribute('rows', '3');
        i.value = state[name] || '';
      }
      i.addEventListener('input', e => { state[name] = e.target.value; });
      f.appendChild(i);
      return f;
    }

    const grid4a = el('div', { class: 'cfg-row' });
    grid4a.appendChild(field('fullname', 'cfg.field.fullname', 'text', true));
    grid4a.appendChild(field('company', 'cfg.field.company', 'text', false));
    s4.appendChild(grid4a);

    const grid4b = el('div', { class: 'cfg-row' });
    grid4b.appendChild(field('email', 'cfg.field.email', 'email', true));
    grid4b.appendChild(field('phone', 'cfg.field.phone', 'tel', false));
    s4.appendChild(grid4b);

    s4.appendChild(field('message', 'cfg.field.message', 'textarea', false, t('cfg.field.message.ph')));
    stepsWrap.appendChild(s4);

    rerenderActiveStep();
  }

  function init() {
    rootEl = document.getElementById('yatex-cfg');
    if (!rootEl) return;
    // build shell
    rootEl.innerHTML = `
      <div class="cfg-wrap">
        <div class="cfg-header">
          <div class="cfg-step-label"></div>
          <div class="cfg-progress"><div class="cfg-progress-bar"></div></div>
        </div>
        <div class="cfg-steps"></div>
        <div class="cfg-error"></div>
        <div class="cfg-summary cfg-sum-empty"></div>
        <div class="cfg-footer">
          <button type="button" class="btn btn-outline cfg-back">${t('cfg.back')}</button>
          <span class="cfg-fine"></span>
          <button type="button" class="btn cfg-next">${t('cfg.next')}</button>
        </div>
      </div>
      <div class="cfg-success">
        <svg class="cfg-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <div class="cfg-success-msg"></div>
      </div>
    `;
    rootEl.querySelector('.cfg-back').addEventListener('click', () => go(-1));
    rootEl.querySelector('.cfg-next').addEventListener('click', () => go(+1));

    function refreshLabels() {
      rootEl.querySelector('.cfg-fine').textContent = t('cfg.fine');
      rootEl.querySelector('.cfg-success-msg').textContent = t('cfg.success');
      rootEl.querySelector('.cfg-back').textContent = t('cfg.back');
    }
    refreshLabels();
    rebuild();

    window.addEventListener('langchange', () => {
      refreshLabels();
      rebuild();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
