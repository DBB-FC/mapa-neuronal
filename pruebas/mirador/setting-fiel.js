// Un «Setting» fiel: crea el mismo DOM que Obsidian, con inputs de verdad.
window.__SettingFiel = class {
  constructor(c) {
    this.settingEl = c.createDiv('setting-item');
    this.infoEl = this.settingEl.createDiv('setting-item-info');
    this.nameEl = this.infoEl.createDiv('setting-item-name');
    this.descEl = this.infoEl.createDiv('setting-item-description');
    this.controlEl = this.settingEl.createDiv('setting-item-control');
  }
  setName(v) { this.nameEl.setText(String(v)); return this; }
  setDesc(v) { this.descEl.setText(String(v)); return this; }
  setHeading() { this.settingEl.addClass('setting-item-heading'); return this; }
  setDisabled() { return this; }
  _texto(etiqueta, cb) {
    const el = this.controlEl.createEl(etiqueta, etiqueta === 'input' ? { type: 'text' } : {});
    const c = { inputEl: el,
      setValue(v) { el.value = v ?? ''; return c; },
      getValue() { return el.value; },
      setPlaceholder(v) { el.placeholder = v ?? ''; return c; },
      onChange(f) { el.addEventListener('input', () => f(el.value)); return c; },
      setDisabled() { return c; } };
    cb(c); return this;
  }
  addText(cb) { return this._texto('input', cb); }
  addTextArea(cb) { return this._texto('textarea', cb); }
  addToggle(cb) {
    const el = this.controlEl.createEl('input', { type: 'checkbox' });
    const c = { toggleEl: el, setValue(v) { el.checked = !!v; return c; }, onChange(f) { el.addEventListener('change', () => f(el.checked)); return c; }, setDisabled() { return c; } };
    cb(c); return this;
  }
  addSlider(cb) {
    const el = this.controlEl.createEl('input', { type: 'range' });
    const c = { sliderEl: el, setLimits(a, b, s) { el.min = a; el.max = b; el.step = s; return c; }, setValue(v) { el.value = v; return c; }, setDynamicTooltip() { return c; }, onChange(f) { el.addEventListener('input', () => f(Number(el.value))); return c; } };
    cb(c); return this;
  }
  addDropdown(cb) {
    const el = this.controlEl.createEl('select');
    const c = { selectEl: el,
      addOptions(o) { for (const [k, v] of Object.entries(o)) { const op = el.createEl('option', { text: v }); op.value = k; } return c; },
      addOption(k, v) { const op = el.createEl('option', { text: v }); op.value = k; return c; },
      setValue(v) { el.value = v; return c; },
      onChange(f) { el.addEventListener('change', () => f(el.value)); return c; } };
    cb(c); return this;
  }
  addButton(cb) {
    const el = this.controlEl.createEl('button');
    const c = { buttonEl: el, setButtonText(v) { el.setText(String(v)); return c; }, setCta() { el.addClass('mod-cta'); return c; }, setIcon() { return c; }, setTooltip() { return c; }, setDisabled(v) { el.disabled = !!v; return c; }, onClick(f) { el.addEventListener('click', f); return c; } };
    cb(c); return this;
  }
};
