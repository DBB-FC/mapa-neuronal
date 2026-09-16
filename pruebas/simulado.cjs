/* Lo mínimo de Obsidian para cargar el plugin fuera de Obsidian, y un vault falso en memoria.
 *
 * No depende de ninguna carpeta del computador: las notas se escriben acá abajo. Así la prueba
 * dice lo mismo en la máquina del autor, en la de cualquiera y en GitHub Actions.
 */
const fs = require('fs'), path = require('path');

const Componente = class {
  registerEvent() {}
  registerDomEvent(el, tipo, fn) { (this._eventos = this._eventos || []).push([el, tipo, fn]); }
  registerInterval() {}
};

function obsidianSimulado() {
  const avisos = [];
  return {
    avisos,
    modulo: {
      Plugin: class extends Componente {
        constructor() { super(); this.comandos = []; this.vistas = []; this.ribbon = []; this.pestanas = []; this._datos = null; this.manifest = { id: 'mapa-neuronal', version: '0.0.0-prueba' }; }
        registerView(tipo, fn) { this.vistas.push([tipo, fn]); }
        addSettingTab(t) { this.pestanas.push(t); }
        addRibbonIcon(icono, titulo, fn) { this.ribbon.push([icono, titulo, fn]); return { addClass() {} }; }
        addCommand(c) { this.comandos.push(c); }
        async loadData() { return this._datos; }
        async saveData(d) { this._datos = JSON.parse(JSON.stringify(d)); }
      },
      ItemView: class extends Componente { constructor(hoja) { super(); this.leaf = hoja; } onPaneMenu() {} },
      PluginSettingTab: class extends Componente { constructor(app, plugin) { super(); this.app = app; this.plugin = plugin; } },
      Setting: class {
        constructor(c) { this.c = c; }
        setName(v) { this.nombre = v; return this; }
        setDesc(v) { this.desc = v; return this; }
        setHeading() { return this; }
        addText(f) { f(campo()); return this; }
        addTextArea(f) { f(campo()); return this; }
        addToggle(f) { f(campo()); return this; }
        addSlider(f) { f(campo()); return this; }
        addDropdown(f) { f(campo()); return this; }
        addButton(f) { f(campo()); return this; }
      },
      Menu: class { constructor() { this.items = []; } addItem(f) { const c = campo(); this.items.push(c); f(c); return this; } addSeparator() { this.items.push('---'); return this; } showAtMouseEvent() {} },
      Modal: class { constructor(app) { this.app = app; this.contentEl = el(); } setTitle() {} close() {} },
      Notice: class { constructor(m) { avisos.push(String(m)); } },
      Platform: { isMobile: false, isPhone: false },
      debounce: (f) => f,
      setIcon: () => {},
      requestUrl: async (o) => (global.__req ? global.__req(o) : { status: 500, json: {} }),
      normalizePath: (p) => String(p).replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\/|\/$/g, ''),
      getLanguage: () => global.__idioma || 'en',
    },
  };
}

// Elemento de interfaz falso: acepta todo lo que el plugin le pide y no dibuja nada.
const el = () => ({
  setText() {}, empty() {}, createDiv: el, createEl: el, createSpan: el, appendText() {},
  addClass() {}, removeClass() {}, toggleClass() {}, hasClass: () => false, setCssProps() {},
  show() {}, hide() {}, remove() {}, style: {}, isShown: () => true, onclick: null, disabled: false,
  inputEl: { type: '', rows: 0, addClass() {} },
  getBoundingClientRect: () => ({ width: 1400, height: 900, top: 0, left: 0 }),
  getContext: () => contexto2D(),
  addEventListener() {},
});
const campo = () => { const o = {}; for (const k of ['setValue', 'onChange', 'setPlaceholder', 'setLimits', 'setDynamicTooltip', 'addOptions', 'setButtonText', 'setCta', 'onClick', 'setIcon', 'setChecked', 'setDisabled', 'setTooltip']) o[k] = () => o;
  o.setTitle = (v) => { o.titulo = v; return o; }; o.inputEl = { type: '', rows: 0, addClass() {} }; return o; };
// Lienzo falso: cuenta las llamadas para saber que de verdad dibujó.
const contexto2D = () => { const c = { llamadas: 0 }; const nada = () => { c.llamadas++; }; for (const k of ['beginPath', 'moveTo', 'lineTo', 'arc', 'fill', 'stroke', 'fillRect', 'strokeRect', 'setLineDash', 'bezierCurveTo', 'save', 'restore', 'translate', 'scale', 'clearRect', 'fillText', 'closePath', 'quadraticCurveTo',
    'setTransform', 'resetTransform', 'rotate', 'clip', 'rect', 'roundRect', 'arcTo', 'ellipse', 'drawImage', 'strokeText']) c[k] = nada; c.createLinearGradient = () => ({ addColorStop() {} }); c.createRadialGradient = () => ({ addColorStop() {} }); c.measureText = (t) => ({ width: String(t).length * 6 }); return c; };

/* Vault falso: un objeto { 'ruta.md': 'contenido' } se convierte en la API que usa el plugin. */
function vaultSimulado(notas) {
  const archivos = Object.keys(notas);
  const base = (p) => p.split('/').pop().replace(/\.md$/, '');
  const porBase = {}; archivos.forEach((p) => (porBase[base(p)] = p));
  const leerFm = (t) => {
    const o = {}; const m = t.match(/^---\n([\s\S]*?)\n---/); if (!m) return o;
    let clave = null;
    for (const l of m[1].split('\n')) {
      const lista = l.match(/^\s+-\s+(.*)$/);
      if (lista && clave) { (o[clave] = Array.isArray(o[clave]) ? o[clave] : []).push(lista[1].replace(/^["']|["']$/g, '')); continue; }
      const kv = l.match(/^([\w-]+):\s*(.*)$/);
      if (!kv) continue;
      clave = kv[1];
      o[clave] = kv[2] === '' ? [] : kv[2].replace(/^["']|["']$/g, '');
    }
    return o;
  };
  const resolved = {};
  for (const p of archivos) { resolved[p] = {}; for (const x of notas[p].matchAll(/\[\[([^\]|#]+)/g)) { const d = porBase[x[1].trim()]; if (d) resolved[p][d] = 1; } }
  const escrituras = [];
  const app = {
    vault: {
      getMarkdownFiles: () => archivos.filter((p) => notas[p] !== undefined).map((p) => ({ path: p, basename: base(p) })),
      getFileByPath: (p) => (notas[p] !== undefined ? { path: p, basename: base(p) } : null),
      getFolderByPath: (p) => (archivos.some((a) => a.startsWith(p + '/')) ? { path: p } : null),
      createFolder: async () => {},
      create: async (p, t) => { notas[p] = t; archivos.push(p); escrituras.push(['create', p]); },
      createBinary: async (p) => { escrituras.push(['createBinary', p]); },
      append: async (f, t) => { notas[f.path] += t; escrituras.push(['append', f.path]); },
      process: async (f, fn) => { notas[f.path] = fn(notas[f.path]); escrituras.push(['process', f.path]); },
      cachedRead: async (f) => notas[f.path],
      read: async (f) => notas[f.path],
    },
    fileManager: {
      processFrontMatter: async (f, fn) => {
        const fm = leerFm(notas[f.path]); fn(fm);
        const cuerpo = notas[f.path].replace(/^---\n[\s\S]*?\n---\n/, '');
        notas[f.path] = '---\n' + Object.entries(fm).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n---\n' + cuerpo;
        escrituras.push(['frontmatter', f.path]);
      },
    },
    metadataCache: { getFileCache: (f) => ({ frontmatter: leerFm(notas[f.path]) }), resolvedLinks: resolved, on: () => ({}) },
    workspace: { on: () => ({}), getLeavesOfType: () => [], getActiveFile: () => null, getLeaf: () => ({ setViewState: async () => {} }), revealLeaf: () => {}, getActiveViewOfType: () => null },
    loadLocalStorage: (k) => app._ls[k],
    saveLocalStorage: (k, v) => { app._ls[k] = v; },
    _ls: {},
  };
  return { app, notas, escrituras, el, contexto2D };
}

/* Carga el plugin construido (main.js) y devuelve sus piezas internas. */
function cargarPlugin(rutaMain) {
  const ruta = rutaMain || path.join(__dirname, '../main.js');
  const texto = fs.readFileSync(ruta, 'utf8');
  const sim = obsidianSimulado();
  const m = { exports: {} };
  global.window = global.window || { devicePixelRatio: 2, matchMedia: () => ({ matches: false }), requestAnimationFrame: () => 0, cancelAnimationFrame: () => {}, open: (u) => { (global.__abiertas = global.__abiertas || []).push(u); }, localStorage: { getItem: () => null } };
  global.document = global.document || { visibilityState: 'visible' };
  global.getComputedStyle = global.getComputedStyle || (() => ({ getPropertyValue: () => '' }));
  global.ResizeObserver = global.ResizeObserver || class { observe() {} disconnect() {} };
  new Function('require', 'module', 'exports', texto + '\nmodule.exports.__t = { construir, VistaMapa, AsistenteCapas, AjustesMapa, AJUSTES_BASE, PROVEEDORES, CAPAS_ESTANDAR, EN, T, enlacesDe, detectarCarpetas, leerAjustes, CLAVE_IA };')(
    (n) => (n === 'obsidian' ? sim.modulo : require(n)), m, m.exports);
  return { Plugin: m.exports.default || m.exports, interno: m.exports.__t, avisos: sim.avisos };
}

/* Marcador de pruebas mínimo: cuenta y explica la primera diferencia. */
function pruebas(nombre) {
  let ok = 0; const fallos = [];
  const igual = (titulo, real, esperado) => {
    const a = JSON.stringify(real), b = JSON.stringify(esperado);
    if (a === b) { ok++; return true; }
    fallos.push(`${titulo}\n       esperado: ${b}\n       obtenido: ${a}`);
    return false;
  };
  const cierto = (titulo, valor) => igual(titulo, !!valor, true);
  const cerrar = () => {
    console.log(`${nombre}: ${ok} bien${fallos.length ? `, ${fallos.length} MAL` : ''}`);
    fallos.forEach((f) => console.log('   ✕ ' + f));
    return fallos.length;
  };
  return { igual, cierto, cerrar };
}

module.exports = { cargarPlugin, vaultSimulado, pruebas, el, contexto2D };
