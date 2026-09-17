# Tarea: cerrar ingesta pendiente y verificar cobertura del Cerebro

Fecha: 2026-09-17
Estado: definida; ejecución pendiente.
Rama de esta especificación: `docs/tarea-cobertura-ingesta`.
Alcance autorizado ahora: documentar la tarea, sin ejecutar ingesta ni cambios funcionales.
Sistema de tareas: este documento. Anytype se eliminó el 17.09.2026 y no se usa.
Copia de trabajo: `~/Desktop/PENDING CHORES/Segundo-Cerebro/2026-09-17 cobertura-captura-ingesta-mapa.md`
(puntero a este archivo; la versión canónica es esta).

## Consenso y objetivo

El wiki está conectado. Hay dos problemas distintos que no se deben confundir:

1. **Ingesta pendiente:** material capturado que ninguna página incorporó.
2. **Trazabilidad incompleta:** material procesado cuya procedencia no está citada
   de forma reconocible.

Why Graph dibuja las páginas configuradas del wiki y las fuentes que reconoce en
sus citas. Ambos problemas pueden parecer una misma ausencia visual: «no apareció».

Objetivo: poder verificar, para cada fuente inventariada, qué se hizo con ella,
qué evidencia respalda ese estado y qué parte debe aparecer en el mapa.
No se busca crear una página ni un nodo individual por cada archivo.

## Hechos y límites del diagnóstico

Verificados sobre el plugin instalado (Why Graph 1.26.1), `data.json` del vault y
los archivos del Cerebro, en dos análisis independientes contrastados el 17.09.

- 138 páginas del wiki; 137 incluidas en el mapa. `felipe-cordova` está excluida
  explícitamente en la configuración. Ninguna huérfana.
- Las 7 carpetas de `wiki/` están mapeadas a una capa. No hay páginas fuera de ellas.
- El límite de 150 nodos por capa no explica las ausencias auditadas: la capa
  más llena (técnico + negocio) tiene 67.
- Hay 91 archivos en `raw/articles/` (88 `.md`, 3 `.pdf`). El recuento de citas
  literales varió entre 24 y 25 según el análisis. Recalcular con una misma
  definición (ruta completa con extensión, distintos, desde páginas del grafo) y
  guardar el detalle.
- Dos capturas del 17.09 en `Clippings/` («Imperio Agéntico · OS Agéntico»,
  «Vende el diagnóstico, no el chatbot») no tenían ingesta identificada al revisar.
- Las 26 fuentes cuestionadas de `raw/articles/` son un lote de revisión, no 26
  pendientes confirmados. Contraejemplos ya encontrados:
  - Whisper fue consumido sin página nueva, por decisión registrada en el diario
    del 08.09 («ya corre faster-whisper»).
  - Las NCG 502 y 514 están tratadas en `ley-fintec-cmf` y otras nueve páginas,
    aunque eso no acredita lectura completa de ambos PDF.
- El lote Diseño del 16.09 (6 clips de Skool) no tiene cierre de ingesta en el
  log. Dos tienen nombre roto por el harvest (`2026-09-16-.md`, `2026-09-16--2.md`).
  El clip «La nueva forma de vender diseño» tiene solapamiento casi total con el
  anexo `imperio-venta-x19`: comparar antes de ingerir.
- Imperio Venta tiene ingesta documentada (tres pasadas) y referencias abreviadas
  a sus 39 fuentes (`imperio-venta-pdf-*`, rangos, nombres sin ruta). El lector
  del plugin solo reconoce rutas completas con extensión, por eso no las dibuja.
- Se detectaron 21 directorios diarios sin cita literal desde el wiki, incluidos
  el 30.08 (154 archivos) y el 31.08 (41). Esto no demuestra ausencia de ingesta
  ni lectura completa de los demás días.
- El log del 17.09 registra la pausa de cosecha y auto-commit de Hermes por orden
  de Felipe. No reactivar como efecto secundario de esta tarea.
- El lector de fuentes del plugin (`src/main.js`, constante `RAW`) no reconoce
  nombres con espacios ni tildes. Hoy ningún archivo real lo sufre; es mejora, no causa.
- Agrupar un día de `raw/daily/` en un solo nodo es diseño correcto. Se mantiene.

## Contratos de ejecución

- Leer `index.md`, `entidades.md` y las páginas canónicas antes de clasificar.
  Nada de `grep` a ciegas sobre el vault como sustituto de esa lectura.
- `raw/` es inmutable: no editar, renombrar, mover ni borrar archivos existentes.
  Los dos clips con nombre roto se conservan tal cual; su corrección se hace en
  el harvest, no sobre los originales.
- Solo el proceso de ingesta escribe en `wiki/`, incluidos sus reportes generados.
- El skill `segundo-cerebro` existe en `~/.claude/skills/segundo-cerebro/SKILL.md`.
  Leerlo antes de usarlo. Si no responde, no sustituirlo con escritura manual.
- Leer las instrucciones locales antes de cambiar prompts, scripts o lint.
- Trabajar en ramas de cada repositorio; Felipe realiza los merges.
- Sin subagentes salvo orden explícita de Felipe en el mismo mensaje.
- No modificar Forge ni Forge Studio Pro. No publicar una versión del plugin.
- No enviar fuentes a proveedores externos sin autorización para ese destino.

## 1. Inventario y clasificación

Construir primero una tabla de las 26 fuentes cuestionadas y las dos capturas.
Identificar las rutas exactas; deduplicar el lote antes de fijar su tamaño.
Columnas: ruta, estado, destino, evidencia, motivo y fecha de verificación.

Estados de resolución:

| Estado | Evidencia requerida |
|---|---|
| Pendiente | Revisión que no identifica incorporación ni resolución previa |
| Incorporado | Página canónica y evidencia de qué contenido incorporó |
| Descartado | Decisión explícita y motivo; el archivo original se conserva |
| Redundante | Fuente o página equivalente y comparación que lo respalda |
| Por verificar | La evidencia no alcanza; la brecha queda explícita |

La ausencia de cita no asigna automáticamente el estado pendiente. Cuando no
alcanza la evidencia, dejar «por verificar» con la brecha explícita. Esto es una
condición de revisión, no una resolución inventada. «Consumido sin página nueva»
tampoco equivale automáticamente a descartado: puede ser redundante con
conocimiento existente, como Whisper.

Entregable: tabla revisable por Felipe antes de ingerir. Las decisiones se
registran mediante el proceso autorizado (log de ingesta), sin crear un segundo
registro manual del wiki.

## 2. Captura, ingesta y reparación de citas

- Pasar las capturas de `Clippings/` a `raw/` mediante el flujo autorizado,
  conservando contenido y procedencia. Ninguna captura desaparece en el traslado;
  los nombres resultantes deben ser sanos. No ejecutar a ciegas un harvest que
  mueva originales sin revisar su salida.
- Ingerir solamente pendientes confirmados, empezando por Diseño.
- Comparar el clip del 16.09 con `x19` y aprovechar las páginas existentes.
- Buscar cada entidad en `entidades.md` bajo todos sus aliases antes de crear
  o actualizar una página.
- Completar referencias en Imperio Venta, las páginas pertinentes de las NCG y
  los diarios solo cuando exista evidencia de uso de esas fuentes.
- Toda cita de archivo incluye ruta completa y extensión; evitar comodines,
  rangos abreviados y nombres que dependan de una ruta mencionada antes.
- La cita de un directorio diario indica procedencia general, no lectura total.
  Nombrar los archivos usados; declarar revisión completa solo cuando se verificó.
- Cada fuente ingerida aporta una actualización concreta o tiene razón documentada
  para no aportarla.

## 3. Cobertura y lint

Reutilizar el log y los rastros del flujo existente. Definir primero un formato
estructurado mínimo (por ejemplo, una línea `Fuentes:` con rutas completas y una
línea `Resueltas sin página:` en cada entrada del log) que permita derivar estados
sin interpretar frases ambiguas. El reporte es una vista derivada, no otra fuente
de verdad mantenida a mano.

Generar `wiki/cobertura.md` exclusivamente a través de la ingesta, con resumen,
fecha, alcance y enlaces al detalle. Máximo 200–250 líneas por Markdown;
particionar el detalle cuando sea necesario y no volcar miles de rutas en el
resumen. El detalle exhaustivo queda en un formato y ubicación autorizados por el
contrato local, sin convertirlo en otra página gigante del vault.

Agregar a `prompts/lint.md` comprobaciones de:

- Fuentes inventariadas sin resolución verificable: observación para revisar.
- Fuentes incorporadas sin destino o evidencia: inconsistencia.
- Citas a rutas inexistentes: error.
- Citas abreviadas, comodines y referencias sin extensión: observación contextual.
- Diarios sin procedencia documentada: observación, no prueba de falta de ingesta.
- Capturas en espera en `Clippings/` y antigüedad del último procesamiento exitoso.

No marcar cobertura completa si falla una lectura, quedan rutas sin revisar o el
registro no permite establecer el estado. Informar el alcance incompleto.
No exigir un diario para cada fecha ni una página individual por fuente.

## 4. Why Graph — versión 1.27 (consenso final Claude + Codex, 17.09)

Regla: **el plugin observa archivos y relaciones; el usuario define su organización y
el significado de su flujo.** El cerebro de Felipe valida el caso exigente sin
imponerse a nadie. El patrón LLM Wiki de Karpathy (texto público) sirve para que el
asistente detecte y proponga; nunca para inferir estados.

| Pieza | Acuerdo |
|---|---|
| Carpetas de fuentes | Una o varias, con subcarpetas. El asistente propone (señales: carpeta citada por notas, `index.md`, `log.md` con prefijo de Karpathy); el usuario confirma. Nada se asume por nombre. Rutas con tildes y espacios. |
| Fuentes bajo demanda | Ocultas visualmente; sus relaciones se conservan para búsqueda, navegación y conteos. Ajuste en tres estados: no mostrar · bajo demanda · mostrar todas. Migración: el «sí» actual pasa a «mostrar todas». |
| Ficha de fuente | Abrir original, «citada por» (una fuente respalda varias notas), salto a la cita. Si falta el archivo: ruta y problema. |
| Referencias rotas | Solo rutas explícitas a archivos locales dentro de las carpetas de fuentes. Una ruta que resuelve a una carpeta existente es una cita deliberada a la carpeta, dibujada como nodo agrupado, con aviso de que no equivale a citar cada archivo. Texto que parece ruta no es cita. |
| Buscador completo | Incluye notas ocultas, colapsadas y fuentes; resultados seleccionables; respeta exclusiones. |
| Bandeja «Sin vínculo · N» | Lista lateral, nunca puntos en el lienzo. Significa solo «sin citas reconocidas». Contador «fuentes citadas: X de Y» que declara carpetas y tipos contados, y distingue «sin cita en el vault» de «citada por una nota excluida de esta vista». |

Además: CI en ramas y PR con pruebas obligatorias que no se omitan en silencio; tres
vaults sintéticos (sin fuentes, estructura alternativa, configuración actual del cerebro)
con PDF, Unicode, referencias rotas, múltiples citas y exclusiones; README que explique
qué habilita cada función y describa solo lo implementado («con cualquier vault ves el
mapa; con un LLM wiki ves además de dónde salió cada cosa»).

Fuera: tiempo como columnas (pendiente de 1.24.0), estados de ingesta leídos del log,
clasificación de motivos por palabras, relaciones tipadas, sugerencias de utilidad,
exportación JSON, reorganización del código, actualización incremental.

Convergencia con la etapa 3: la etapa 5 chequea en este vault, con scripts y el log, lo
que el plugin no puede saber (procesada sin vínculo, descartada, redundante). El plugin
muestra solo lo observable: citada o sin cita.

## Verificación y cierre

1. Una captura nueva termina con estado, destino y evidencia verificables.
2. Un duplicado (clip 16.09 vs `x19`) se resuelve sin crear páginas redundantes.
3. Whisper conserva su resolución histórica sin inventarle una ingesta nueva.
4. Las fuentes efectivamente usadas por Imperio Venta y las NCG quedan trazables.
5. Un diario mantiene su nodo agrupado y permite identificar los archivos usados.
6. El lint detecta una cita rota, una resolución sin evidencia y una fuente no revisada.
7. El contador coincide con un inventario reproducible; inventarios y reportes
   de cobertura no inflan artificialmente las citas de conocimiento.
8. Probar Unicode, espacios, PDF, citas repetidas y agrupación diaria; ejecutar
   los checks del plugin y revisar el resultado en Obsidian.
9. Confirmar que los originales de `raw/` permanecen intactos, que no se
   reactivaron tareas pausadas y que no se publicó una versión.

Handoff final: inventario, fuentes resueltas y abiertas, páginas actualizadas,
evidencia de validación, ramas/PRs y decisión pendiente sobre automatización.
El modo inicial es manual; reactivar cosecha o crear recordatorios requiere
una decisión explícita separada, no es condición para cerrar este lote.

## Orden de ejecución propuesto

| # | Paso | Escribe en | Requiere |
|---|---|---|---|
| 1 | Inventario y tabla de 28 fuentes | nada (lectura) | «sí» de Felipe para empezar |
| 2 | Revisión de la tabla por Felipe | — | — |
| 3 | Captura de `Clippings/` e ingesta de pendientes | `raw/` (harvest), `wiki/` (ingesta) | tabla aprobada |
| 4 | Reparación de citas | `wiki/` (ingesta) | evidencia de uso |
| 5 | Formato de log, `cobertura.md`, lint | `prompts/`, `wiki/` (ingesta) | rama en el Cerebro |
| 6 | Plugin: regex, contador, pruebas | `src/main.js`, `pruebas/` | rama en este repo |
