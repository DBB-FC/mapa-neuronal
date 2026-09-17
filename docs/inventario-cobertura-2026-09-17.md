# Inventario de fuentes cuestionadas — paso 1 de la tarea de cobertura

Fecha de verificación: 2026-09-17 · Solo lectura. Nada se ingirió ni se movió.
Método: lectura de `index.md`, `entidades.md` y las páginas canónicas; búsqueda por título,
alias y URL en `wiki/`, `log.md` y `log-2026.md`. La ausencia de cita literal no asignó estado.

Estados: **Pendiente** · **Incorporado** · **Descartado** · **Redundante** · **Por verificar**.

## Capturas en `Clippings/` (17.09, sin pasar a `raw/`)

| Ruta | Estado | Destino | Evidencia | Motivo / acción |
|---|---|---|---|---|
| `Clippings/Imperio Agéntico · OS Agéntico.md` (4,6 KB) | **Pendiente** | `negocio/imperio-agentico` | La página solo menciona `os.imperioagentico.com` como «buscador de conceptos». No hay ingest en el log. | Harvest a `raw/` e ingesta corta en la página existente. No crear página nueva. |
| `Clippings/Vende el diagnóstico, no el chatbot - 🔴 Grabaciones.md` (48,6 KB) | **Pendiente** | `negocio/vender-el-sistema-no-la-pieza` o `negocio/imperio-venta` | Ninguna mención en wiki ni log. Es una grabación de Imperio (classroom `bd45b8a3`). | Harvest a `raw/`. Ingesta con comparación contra `vender-el-sistema-no-la-pieza`, que trata la misma tesis. |

## Lote Diseño 16.09 (classroom `dc2203b0` de Skool)

| Ruta | Estado | Destino | Evidencia | Motivo / acción |
|---|---|---|---|---|
| `2026-09-16-.md` «Claude Design» (2,4 KB) | **Pendiente** | por decidir: `tecnico/` (herramienta) | Log-2026 menciona «Claude Design» una vez (línea 114) en otro contexto. Sin página. Nombre roto por el harvest. | Ingerir. Buscar alias «Claude Design» en entidades antes. |
| `2026-09-16--2.md` «Templates MotionSites en el OS Agéntico» (3,6 KB) | **Pendiente** | `negocio/imperio-agentico` | Sin mención. Nombre roto por el harvest. | Ingerir junto con la captura de OS Agéntico: es el mismo sistema. |
| `2026-09-16-la-nueva-forma-de-vender-dise-no-dise-no.md` (4,6 KB) | **Redundante** (probable) | `negocio/imperio-venta-recursos` (anexo x19) | `imperio-venta-x19` ya ingerido el 24.08. Diff de cuerpo: 25 líneas distintas de ~90. | Comparar el diff antes de cerrar. Si las 25 líneas son solo formato, marcar redundante y citarlo como recaptura. |
| `2026-09-16-landing-pages-claude-design-m-etodo-f-r-a-m-e-dise-no.md` (9,1 KB) | **Pendiente** | por decidir: `tecnico/` o `negocio/` | Sin mención de F.R.A.M.E en wiki ni log. Es el más largo del lote. | Ingerir. Relacionar con `dbb` (web) y `estandar-informe-dbb`. |
| `2026-09-16-logro-20-casa-pegaso-tribuna-el-kit-de-prensa-de-una-marca.md` (4,0 KB) | **Pendiente** | por decidir | Sin mención de Pegaso ni «kit de prensa». Es un post de la comunidad, no una lección. | Ingerir solo si aporta al kit de marcas de DBB (`~/Documents/Marcas/`). Si no, descartar con motivo. |
| `2026-09-16-todo-lo-que-puedes-dise-nar-5-casos-reales-dise-no.md` (3,7 KB) | **Pendiente** | mismo destino que Claude Design | Sin mención. | Ingerir junto con Claude Design: son la misma serie. |

## Otras fuentes de `raw/articles/` sin cita literal

| Ruta | Estado | Destino | Evidencia | Motivo / acción |
|---|---|---|---|---|
| `2026-08-20-presentacion-esencial.md` (13,7 KB) | **Incorporado** | `proyectos/segundo-cerebro`, `personas/carlos-dominguez` | Presentación de la clase del 20.08 de Carlos Domínguez. `segundo-cerebro` línea 208: «El método del cerebro salió de la clase de Imperio Agéntico del 20.08». Cinco páginas mencionan la clase. | Solo falta la cita con ruta completa. |
| `2026-08-20-presentacion-tecnica.md` (28,3 KB) | **Incorporado** | mismas páginas | Misma clase, versión técnica. Misma evidencia. | Solo falta la cita. Confirmar que la versión técnica se leyó (28 KB) y no solo la esencial. |
| `2026-08-23-perfil-linkedin-felipe-cordova.md` (219 B) | **Incorporado** | `personas/felipe-cordova` | La página cita el perfil y el cargo en CDV FOODS (líneas 33 y 64). | Solo falta la cita. La página está excluida del mapa a propósito. |
| `2026-08-23-post-x-hanakoxbt.md` (546 B) | **Por verificar** | ninguno | Post sobre Andrew Ng y «loops and graphs». Sin mención en wiki ni log. Existe `tecnico/loops-de-agentes` y `tecnico/agentes-en-grafo`, sin cita. | Leer esas dos páginas. Si la idea está, redundante; si no, descartar por bajo valor (546 bytes). |
| `2026-08-23-post-x-nateherk.md` (111 B) | **Descartado** (propuesto) | ninguno | Un tuit de 111 bytes que apunta a un skill de diseño web sin nombrarlo. | Descartar con motivo: sin contenido propio. |
| `2026-08-24-imperio-venta-01-captura-clipper.md` (13 KB) | **Redundante** | `negocio/imperio-venta` | Es la captura vía Clipper del playbook 01. El log del 24.08 ingirió `imperio-venta-01..10` y luego los 10 PDF. | Marcar redundante con `imperio-venta-01-el-primer-cliente.md`. |
| `2026-08-24-ley-propiedad-intelectual-chile.md` (6,2 KB) | **Por verificar** | `tecnico/cumplimiento-datos-chile` | La página tiene la sección «Ley 17.336 — propiedad intelectual». El archivo es una búsqueda de Google, no la ley. | Confirmar si la sección se escribió desde esta captura o desde otra fuente. Si es lo primero, incorporado y citar. |
| `2026-08-24-skool-imperio-agentico.md` (36,5 KB) | **Redundante** (probable) | `negocio/imperio-agentico` | Captura de la página del playbook 10 en Skool, con la navegación entera del classroom. Cuerpo empieza con «Escribe algo» y el calendario. | Comparar con `imperio-venta-10-la-mantencion.md`. Probable redundante con ruido de navegación. |
| `2026-08-31-ncg-502-cmf-prestadores-ley-fintec.pdf` (1,4 MB) | **Incorporado** | `tecnico/ley-fintec-cmf` | Entidad NCG 502 en el diccionario con seis páginas que la tratan. | Solo falta la cita con ruta completa. No acredita lectura completa del PDF; dejarlo dicho en la cita. |
| `2026-08-31-ncg-514-cmf-finanzas-abiertas.pdf` (0,9 MB) | **Incorporado** | `tecnico/ley-fintec-cmf` | Entidad NCG 514 con alcance acotado al SFA, en la página y en `kapa21`. | Igual que la anterior. |
| `ley-21521-fintec.md` (158 KB) | **Incorporado** | `tecnico/ley-fintec-cmf` | La tabla de la página resume la ley (55 artículos, fecha). | Solo falta la cita. |
| `2026-09-06-skool-glosario-imperial.md` (1,3 KB) | **Redundante** | con la versión completa | Es la primera captura, incompleta. | Marcar redundante con `…-completo.md`. |
| `2026-09-06-skool-glosario-imperial-completo.md` (17 KB) | **Pendiente** | `negocio/imperio-agentico` | Sin mención de «glosario» ni «ordenar mi imperio» en wiki ni log. | Ingerir como sección de vocabulario en la página de la comunidad. Muchos términos irán a aliases de `entidades.md`. |
| `2026-09-07-repo-openai-whisper.md` (9,6 KB) | **Redundante** | `tecnico/nous-portal`, `diario/2026-09-08` | Diario 08.09 línea 103: «consumido sin crear página: ya corre faster-whisper». `nous-portal` y `diario/2026-08-22` documentan faster-whisper local. | Mantener la resolución histórica. Citar desde el diario 08.09. |
| `2026-09-09-clip-3dicons-iconshock.md` (436 B) | **Por verificar** | `tecnico/componentes-reutilizables` o nada | Sin mención. Hoy se trabajó iconografía (`claude-code-dbb-iconografia.md` en raw/daily de hoy). | Ver si la iconografía de hoy usó esta fuente. Si no, descartar: catálogo comercial sin decisión. |
| `2026-09-09-clip-balsamiq-wireframes.md` (8,2 KB) | **Por verificar** | ninguno | Sin mención. Hay skills de UX propios (`ux-design`, `ui-design-workflow`). | Decidir si Balsamiq entra al stack. Si no, descartar con motivo. |
| `2026-09-09-clip-moving-icons.md` (79 B) | **Descartado** (propuesto) | ninguno | 79 bytes: solo el pie de página de un sitio. Captura fallida. | Descartar: sin contenido. |
| `2026-09-09-post-x-annatarxbt-karpathy-graph-engineering.md` (1 KB) | **Por verificar** | `personas/andrej-karpathy` o `tecnico/agentes-en-grafo` | Sin mención de «annatar» ni «graph engineering». Es un rumor de X sobre Karpathy en Anthropic. | Verificar si `agentes-en-grafo` tomó la idea. Si no, descartar: rumor sin fuente primaria. |
| `2026-09-09-post-x-hanakoxbt-memory-vs-graphs.md` (2,2 KB) | **Por verificar** | `tecnico/llm-wiki-vs-rag`, `tecnico/graphify` | Sin mención. El tema (memoria vs grafos) es exactamente el de `llm-wiki-vs-rag` y del skill `graph-scout`. | Leer contra esas páginas. Probable redundante o incorporado sin cita. |
| `2026-09-09-skool-agentes-de-voz-bienvenida.md` (9,7 KB) | **Por verificar** | `negocio/imperio-agentico` | «Agentes de voz» aparece en tres páginas (`obsidian-web-clipper`, `dbb`, `kapa21-lanzamiento`), ninguna es del curso. | Confirmar si el curso «Agentes de Voz (NUEVO)» está en `imperio-agentico`. Si no, pendiente de ingesta corta. |
| `2026-09-15-clip-cap-software.md` (228 B) | **Incorporado** | `tecnico/cap-software` | Página creada el 15.09 desde esta captura móvil; entidad «Cap» en el diccionario. | Solo falta la cita con ruta completa. |
| `2026-09-15-karpathy-llm-wiki.md` (12 KB) | **Por verificar** | `tecnico/llm-wiki-vs-rag`, `personas/andrej-karpathy` | Es el texto original del patrón LLM Wiki. Ambas páginas tratan el patrón; ninguna cita este archivo. Log-2026 no registra su ingesta. | Confirmar si `llm-wiki-vs-rag` se escribió desde este texto o desde la clase del 20.08. Es la fuente primaria del método del cerebro: debe quedar citada. |

## Resumen

| Estado | Cantidad | Qué sigue |
|---|---|---|
| Pendiente | 9 | Harvest de 2 capturas; ingesta de 6 de Diseño (una probable redundante) y del glosario |
| Incorporado, sin cita | 8 | Reparar citas con ruta completa (etapa 4). Sin ingesta nueva |
| Redundante | 5 | Registrar en el log con la fuente equivalente. Sin ingesta |
| Descartado (propuesto) | 2 | Capturas vacías. Confirmar y registrar motivo |
| Por verificar | 9 | Leer la página canónica contra la fuente antes de decidir. Ninguna es urgente salvo `karpathy-llm-wiki` |

Total: 28 fuentes (26 de `raw/articles/` + 2 capturas). Ninguna se deduplicó fuera de las marcadas redundantes.

## Decisiones que necesitan a Felipe

1. Confirmar los dos descartes propuestos (`nateherk`, `moving-icons`).
2. Casa Pegaso / kit de prensa: ¿aporta al kit de marcas o se descarta?
3. Balsamiq y 3dicons: ¿entran al stack de diseño o se descartan?
4. Destino de Claude Design y F.R.A.M.E: ¿página técnica nueva o sección en `dbb` (web)?

## Resultado de la ejecución (17.09, etapas 2 a 4)

Decisiones de Felipe: descartes confirmados; Tribuna aporta; Balsamiq y 3dicons entran al stack;
Claude Design con página técnica propia.

| Estado final | Fuentes | Dónde quedó |
|---|---|---|
| Incorporado (nuevo) | OS Agéntico, Vende el diagnóstico, Claude Design, MotionSites, F.R.A.M.E, 5 casos, Tribuna, Balsamiq, 3dicons, hanako memory-vs-graphs, hanako 23.08 (Ng), karpathy-llm-wiki, agentes de voz (bienvenida), glosario (encabezado) | `tecnico/claude-design`, `tecnico/stack-diseno`, `negocio/vende-el-diagnostico` (nuevas); `imperio-agentico`, `fran`, `andrej-karpathy`, `llm-wiki-vs-rag`, `agentes-en-grafo`, `loops-de-agentes` |
| Incorporado, cita reparada | presentaciones 20.08 (2), LinkedIn, NCG 502, NCG 514, Ley 21.521, propiedad intelectual, clip Cap, los 39 de Imperio Venta | frontmatter `fuentes:` con ruta completa |
| Redundante (en log) | clip x19 del 16.09, captura-clipper 01, skool 24.08 (anuncio playbook 10), glosario corto, Whisper, stub de Cap | entrada del log «Resueltas sin página nueva» |
| Descartado (en log) | nateherk, moving-icons, annatar | entrada del log «Descartadas» |

Cobertura medida tras la ingesta: **85 de 93** archivos de `raw/articles/` citados con ruta completa
desde el wiki (antes: 25 de 91). `Clippings/` vacío. Lint mecánico: 141 páginas, 0 rotos, 0 huérfanas.

Hallazgos para las etapas 5 y 6:
- Cita rota preexistente: `raw/articles/odepa-metodologia-volumen-y-precios.md` (el archivo no existe). Caso de prueba para el lint.
- Dos fuentes con nombre roto por el harvest (`2026-09-16-.md`, `2026-09-16--2.md`) se citan tal cual; corregir el slug en `ordenar-bandeja.sh` para títulos que empiezan con emoji.
- Pendientes de captura: glosario imperial completo, resto del curso Agentes de Voz. Pendiente de confirmación: el «Felipe» del taller del 04.09.
- Otras sesiones dejaron modificadas hoy en el vault: `dbb`, `forge-studio-pro`, `hermes-ejecutivo`, `maxun`, `nvidia-build`, `tema-dbb`, `tema-venta` y `raw/daily/2026-09-16/*`. No son de esta ingesta. El auto-commit está pausado: nada está commiteado.
