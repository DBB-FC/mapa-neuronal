/* Prueba del plugin completo sobre un vault falso: carga, mapa, panel, enlaces, escritura e IA.
 *
 *   npm test        construye y corre todo
 *   node pruebas/plugin.cjs [ruta/main.js]
 */
const { cargarPlugin, vaultSimulado, pruebas } = require('./simulado.cjs');

const { Plugin, interno } = cargarPlugin(process.argv[2]);
const { construir, VistaMapa, AJUSTES_BASE, enlacesDe, detectarCarpetas, PROVEEDORES, CLAVE_IA } = interno;
const p = pruebas('plugin');

// ── El vault de prueba: 3 capas, 2 temas, un enlace con motivo y otro sin él ──────────────────
const NOTAS = {
  'diario/2026-01-02.md': `---\ntema: tienda\nupdated: 2026-01-02\n---\n\nAbrimos con [[proyecto-tostador]] a medias y hablamos con [[ana-soto]].\n`,
  'diario/2026-01-03.md': `---\ntema: equipo\nupdated: 2026-01-03\n---\n\nDía tranquilo. [[ana-soto]] revisó el turno.\n`,
  'proyectos/proyecto-tostador.md': `---\ntema: tienda\nupdated: 2026-01-05\nrepo: acme/tostador\nweb:\n  - Panel | https://panel.example.com\n  - "javascript:alert(1)"\n---\n\nEl tostador de 15 kg necesita más potencia; lo pidió [[ana-soto]].\n\n## Conexiones\n\n**Tema:** [[tema-tienda]]\n\n- [[ana-soto]] — pidió la máquina para el turno de la mañana\n`,
  'personas/ana-soto.md': `---\ntema: equipo\nupdated: 2026-01-04\n---\n\nEncargada del turno de la mañana. Trabaja con [[proyecto-tostador]].\n\n## Conexiones\n\n**Tema:** [[tema-equipo]]\n`,
  'temas/tema-tienda.md': `---\ntema: tienda\nupdated: 2026-01-06\n---\n\nSíntesis de la tienda: [[proyecto-tostador]].\n`,
  'temas/tema-equipo.md': `---\ntema: equipo\nupdated: 2026-01-06\n---\n\nSíntesis del equipo: [[ana-soto]].\n`,
  'plantillas/plantilla-dia.md': `---\ntema: tienda\n---\n\nPlantilla vacía.\n`,
};
const AJUSTES = Object.assign({}, AJUSTES_BASE, {
  capas: 'Entrada | notas con fecha\nEntidades | proyectos y personas\nTemas | síntesis',
  carpetas: 'diario = 0\nproyectos = 1\npersonas = 1\ntemas = 2',
  excluir: 'plantilla-dia',
  propiedadEnlaces: 'repo, web',
  temas: 'tienda = Tienda = #F7931A\nequipo = Equipo = #34D17A',
});

(async () => {
  const { app, notas, escrituras } = vaultSimulado({ ...NOTAS });

  // ── 1. Carga y descarga del plugin ───────────────────────────────────────────────────────────
  const pl = new Plugin();
  pl.app = app;
  await pl.onload();
  p.igual('registra la vista del mapa', pl.vistas.length, 1);
  p.igual('registra dos comandos', pl.comandos.length, 2);
  p.igual('registra el ícono de la barra', pl.ribbon.length, 1);
  p.igual('registra la pestaña de ajustes', pl.pestanas.length, 1);
  p.cierto('los comandos no repiten el nombre del plugin', !pl.comandos.some((c) => /mapa neuronal/i.test(c.name)));
  p.cierto('el idioma por defecto es inglés fuera de Obsidian', pl.comandos[0].name === 'Open the map');
  p.cierto('sin llave no cree tener IA', !pl.tieneIA());
  p.igual('no toca el vault al cargar', escrituras.length, 0);
  await pl.onunload?.();

  // ── 2. El grafo: capas, temas, motivos y frases reales ───────────────────────────────────────
  const D = await construir(app, AJUSTES);
  const porId = Object.fromEntries(D.nodos.map((n) => [n.id, n]));
  p.igual('excluye la nota excluida', D.nodos.some((n) => n.id.includes('plantilla')), false);
  p.igual('reparte las notas en 3 capas', D.capas.length, 3);
  p.igual('cuenta las notas', D.nodos.length, 6);
  p.igual('la nota de diario va a la capa 0', porId['diario/2026-01-02.md'].capa, 0);
  p.igual('el proyecto va a la capa 1', porId['proyectos/proyecto-tostador.md'].capa, 1);
  p.igual('el tema va a la última capa', porId['temas/tema-tienda.md'].capa, 2);
  p.igual('toma el color del tema', porId['proyectos/proyecto-tostador.md'].tema, 'tienda');
  // Las aristas son no dirigidas: se busca el par, sin asumir el orden en que quedó guardado.
  const arista = (x, y) => { const e = D.aristas.find(([a, b]) => (a === x && b === y) || (a === y && b === x)); return e ? { m: e[2], fr: e[3] } : null; };
  p.igual('cada enlace aparece una sola vez', D.aristas.length, new Set(D.aristas.map(([a, b]) => [a, b].sort().join('|'))).size);
  const conMotivo = arista('proyectos/proyecto-tostador.md', 'personas/ana-soto.md');
  p.igual('usa el motivo curado cuando existe', conMotivo && conMotivo.m, 'pidió la máquina para el turno de la mañana');
  const sinMotivo = arista('diario/2026-01-02.md', 'proyectos/proyecto-tostador.md');
  p.igual('sin motivo, guarda la frase real de la nota', sinMotivo.fr && sinMotivo.fr.texto.includes('Abrimos con'), true);
  p.igual('la frase trae su número de línea', typeof (sinMotivo.fr || {}).linea, 'number');
  p.cierto('el resumen sale del cuerpo, no del frontmatter', porId['personas/ana-soto.md'].resumen.startsWith('Encargada del turno'));

  // ── 3. Enlaces externos: lo que entra y lo que se bloquea ────────────────────────────────────
  const enlaces = porId['proyectos/proyecto-tostador.md'].enlaces;
  p.igual('expande usuario/repo a github.com', enlaces[0].url, 'https://github.com/acme/tostador');
  p.igual('acepta «Título | url»', [enlaces[1].titulo, enlaces[1].url], ['Panel', 'https://panel.example.com']);
  p.igual('descarta una URL javascript: escrita en la nota', enlaces.length, 2);
  p.igual('descarta file: y data:', enlacesDe({ web: ['file:///etc/passwd', 'data:text/html,x', 'ftp://x.cl'] }, { propiedadEnlaces: 'web' }).length, 0);
  p.igual('sin la propiedad configurada no muestra nada', enlacesDe({ web: ['https://x.cl'] }, { propiedadEnlaces: '' }).length, 0);

  // ── 4. La vista: dibuja, ordena, encuentra caminos y vacíos ──────────────────────────────────
  const { el, contexto2D } = require('./simulado.cjs');
  const v = new VistaMapa({}, { ajustes: AJUSTES, tieneIA: () => false, app });
  v.app = app; v.contentEl = el(); v.lienzo = { style: {}, getContext: () => contexto2D(), getBoundingClientRect: () => ({ width: 1400, height: 900, top: 0, left: 0 }) };
  v.ctx = v.lienzo.getContext(); v.marca = el(); v.chips = el(); v.estado = el(); v.panel = el(); v.guia = el();
  v.D = D; v.plugin.construir = null;
  await v.recargar();
  p.igual('deja todas las notas visibles en un vault chico', v.N.filter((n) => !n.oculto).length, 6);
  v.dibujar();
  p.cierto('dibuja en el lienzo', v.ctx.llamadas > 50);
  const ruta = v.rutaMasCorta('diario/2026-01-02.md', 'temas/tema-equipo.md');
  p.cierto('encuentra un camino entre dos notas lejanas', Array.isArray(ruta) && ruta.length >= 3);
  p.cierto('el camino no pasa por la capa de entrada', (ruta || []).slice(1).every((id) => porId[id].capa !== 0));
  p.cierto('el modo salud detecta el enlace sin motivo', v.problemas(porId['diario/2026-01-02.md']).some((x) => /reason|motivo/i.test(x)));
  v.radial = true; v.foco = 'personas/ana-soto.md'; v.medir();
  p.cierto('la vista radial arma anillos', (v.anillos || []).length >= 2);
  v.radial = false; v.medir();
  p.cierto('calcular vacíos no falla', Array.isArray(v.calcularVacios()));
  v.cerrada = true; v.pedir();
  p.cierto('cerrada, no vuelve a dibujar', true);

  // ── 5. Escritura en las notas: solo lo prometido ─────────────────────────────────────────────
  const pl2 = new Plugin(); pl2.app = app; await pl2.onload();
  pl2.ajustes = Object.assign({}, AJUSTES, { seccionMotivos: 'Conexiones', carpetaAuditoria: 'auditoria' });
  const fr = { origen: 'personas/ana-soto.md', destino: 'proyectos/proyecto-tostador.md', linea: 3 };
  const antesFm = notas['personas/ana-soto.md'].match(/^---\n[\s\S]*?\n---/)[0];
  await pl2.aprobar(fr, { motivo: 'trabaja todos los días con la máquina', cita_origen: { texto: 'x' }, cita_destino: { texto: 'y' }, modelo: 'prueba' });
  const texto = notas['personas/ana-soto.md'];
  p.cierto('escribe el motivo en la sección configurada', texto.includes('- [[proyecto-tostador]] — trabaja todos los días con la máquina'));
  p.igual('no toca el frontmatter si no se le pidió', texto.match(/^---\n[\s\S]*?\n---/)[0], antesFm);
  p.cierto('no borra lo que ya estaba en la sección', texto.includes('**Tema:** [[tema-equipo]]'));
  p.cierto('deja registro de auditoría', escrituras.some(([op, ruta2]) => /auditoria/.test(ruta2)));
  pl2.ajustes.propiedadFecha = 'updated';
  await pl2.aprobar(fr, { motivo: 'segunda vez, ahora con fecha', cita_origen: {}, cita_destino: {}, modelo: 'prueba' });
  p.cierto('con la propiedad configurada, sí escribe la fecha', /updated: \d{4}-\d{2}-\d{2}/.test(notas['personas/ana-soto.md']));
  p.cierto('una nota sin la sección la crea al final', await (async () => {
    await pl2.aprobar({ origen: 'diario/2026-01-03.md', destino: 'personas/ana-soto.md', linea: 3 }, { motivo: 'la nombra ese día', cita_origen: {}, cita_destino: {}, modelo: 'prueba' });
    return /## Conexiones\n\n- \[\[ana-soto\]\] — la nombra ese día/.test(notas['diario/2026-01-03.md']);
  })());

  // ── 6. La verificación de citas, que es el candado del producto ──────────────────────────────
  p.igual('acepta una cita literal', pl2.verificarCita('turno de la mañana', 'Encargada del turno de la mañana.'), true);
  p.igual('acepta cambios de espacios y de negrita', pl2.verificarCita('**turno**   de la   mañana', 'Encargada del turno de la mañana.'), true);
  p.igual('rechaza una cita inventada', pl2.verificarCita('turno de la tarde', 'Encargada del turno de la mañana.'), false);
  p.igual('rechaza una cita demasiado corta para verificar', pl2.verificarCita('turno', 'Encargada del turno de la mañana.'), false);
  p.igual('rechaza una cita reformulada', pl2.verificarCita('ella se encarga de la mañana', 'Encargada del turno de la mañana.'), false);

  // ── 7. Los cuatro proveedores de IA y sus errores ────────────────────────────────────────────
  const esquema = { type: 'object', additionalProperties: false, required: ['fiel', 'problema'], properties: { fiel: { type: 'boolean' }, problema: { type: 'string' } } };
  const respuestas = {
    claude: { status: 200, json: { content: [{ type: 'text', text: '{"fiel":true,"problema":""}' }] } },
    openai: { status: 200, json: { choices: [{ message: { content: '{"fiel":true,"problema":""}' } }] } },
    gemini: { status: 200, json: { candidates: [{ content: { parts: [{ text: '```json\n{"fiel":true,"problema":""}\n```' }] } }] } },
    local: { status: 200, json: { choices: [{ message: { content: '{"fiel":true,"problema":""}' } }] } },
  };
  for (const prov of Object.keys(PROVEEDORES)) {
    app._ls = {}; if (PROVEEDORES[prov].llave) app._ls[CLAVE_IA(prov)] = 'llave-de-prueba';
    pl2.ajustes.proveedorIA = prov; pl2.ajustes.modeloIA = prov === 'claude' ? 'claude-opus-5' : 'modelo-x';
    let visto = null; global.__req = (o) => { visto = o; return respuestas[prov]; };
    const r = await pl2.llamarIA('sistema', 'usuario', esquema);
    p.igual(`${prov}: devuelve el JSON pedido`, r, { fiel: true, problema: '' });
    p.cierto(`${prov}: manda la llave donde corresponde`, prov === 'local' ? true : /llave-de-prueba/.test(JSON.stringify(visto.headers) + visto.url));
    p.cierto(`${prov}: no manda la llave en el cuerpo`, !/llave-de-prueba/.test(visto.body));
    p.cierto(`${prov}: pide respuesta en JSON`, /json/i.test(visto.body));
  }
  pl2.ajustes.proveedorIA = 'claude'; app._ls[CLAVE_IA('claude')] = 'x';
  const errores = [
    [{ status: 401, json: {} }, /rejected the key/i],
    [{ status: 429, json: {} }, /usage limit/i],
    [{ status: 0, json: {} }, /did not answer/i],
    [{ status: 400, json: { error: { message: 'modelo inexistente' } } }, /modelo inexistente/],
    [{ status: 200, json: { content: [{ type: 'text', text: 'no soy json' }] } }, /readable/i],
    [{ status: 200, json: { stop_reason: 'refusal' } }, /declined/i],
  ];
  for (const [respuesta, esperado] of errores) {
    global.__req = () => respuesta;
    let msg = '(no lanzó)';
    try { await pl2.llamarIA('s', 'u', esquema); } catch (e) { msg = e.message; }
    p.cierto(`error ${respuesta.status}: mensaje claro («${msg.slice(0, 40)}»)`, esperado.test(msg));
  }
  app._ls = {};
  let msgSinLlave = '';
  try { await pl2.llamarIA('s', 'u', esquema); } catch (e) { msgSinLlave = e.message; }
  p.cierto('sin llave avisa antes de salir a la red', /key is missing/i.test(msgSinLlave));

  // ── 8. Las herramientas también cuelgan del «···» de la pestaña ──────────────────────────────
  const { Menu } = require('./simulado.cjs').obsidian || {};
  const menuFalso = { items: [], addItem(f) { const c = { titulo: '', setTitle(v) { c.titulo = v; return c; }, setIcon: () => c, setChecked: () => c, onClick: () => c }; this.items.push(c); f(c); return this; }, addSeparator() { this.items.push('---'); return this; } };
  v.onPaneMenu(menuFalso, 'more-options');
  const titulos = menuFalso.items.filter((x) => x !== '---').map((x) => x.titulo);
  p.cierto('el menú de la pestaña ofrece el asistente de capas', titulos.includes('Layer wizard'));
  p.cierto('y el camino entre dos notas', titulos.includes('Path between two notes'));
  const otroMenu = { items: [], addItem(f) { const c = { setTitle: () => c, setIcon: () => c, setChecked: () => c, onClick: () => c }; this.items.push(c); f(c); return this; }, addSeparator() { return this; } };
  v.onPaneMenu(otroMenu, 'tab-header');
  p.igual('en la cabecera de la pestaña no se mete', otroMenu.items.length, 0);

  // ── 9. El botón «Probar la conexión»: una llamada mínima, sin notas ──────────────────────────
  app._ls = {}; app._ls[CLAVE_IA('claude')] = 'llave-de-prueba';
  pl2.ajustes.proveedorIA = 'claude'; pl2.ajustes.modeloIA = 'claude-opus-5';
  let cuerpoPrueba = null;
  global.__req = (o) => { cuerpoPrueba = o.body; return { status: 200, json: { content: [{ type: 'text', text: '{"ok":true}' }] } }; };
  const prueba = await pl2.llamarIA('Responde solo con JSON.', 'Devuelve exactamente {"ok": true}.',
    { type: 'object', additionalProperties: false, required: ['ok'], properties: { ok: { type: 'boolean' } } });
  p.igual('la prueba de conexión devuelve ok', prueba, { ok: true });
  p.cierto('la prueba no manda ninguna nota', !/tostadora|ana-soto|Encargada/i.test(cuerpoPrueba));
  p.cierto('la prueba es corta (menos de 400 caracteres)', cuerpoPrueba.length < 400);

  // ── 10. El asistente de capas propone algo sensato ────────────────────────────────────────────
  const filas = detectarCarpetas(app);
  const capaDe = (c) => (filas.find((f) => f.carpeta === c) || {}).capa;
  p.igual('manda el diario a la primera capa', capaDe('diario'), 0);
  p.igual('manda personas a entidades', capaDe('personas'), 1);
  p.igual('manda temas a la última', capaDe('temas'), 3);
  p.igual('no muestra las plantillas', capaDe('plantillas'), -1);

  process.exit(p.cerrar() ? 1 : 0);
})().catch((e) => { console.error('ERROR INESPERADO\n', e.stack); process.exit(1); });
