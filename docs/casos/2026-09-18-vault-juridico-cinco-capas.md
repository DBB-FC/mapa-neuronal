# Caso: un vault jurídico-contable en cinco capas, validado con un simulador propio

*18.09.2026 · relato de un usuario del plugin, resumido y anonimizado. Es el origen de la versión 1.28.*

## Qué hizo

Configuró a mano cinco capas en `data.json` y reordenó su segundo cerebro:

| Capa | Contenido | Nodos |
|---|---|---|
| L0 · Conceptos | definiciones canónicas | 59 |
| L1 · Entidades | quién dicta, fiscaliza, autoriza | 12 |
| L2 · Fuentes | leyes, circulares, manuales (notas, no archivos crudos) | 30 |
| L3 · Aplicación | guías, comparaciones, servicios, proyectos | 34 |
| L4 · Temas | hubs de dominio | 14 |

Total: 149 nodos y 1154 enlaces. Antes de abrir Obsidian escribió un simulador en Python que
reimplementa el motor del plugin, y sus conteos coincidieron exactos con los del mapa.

## Qué observó

- Los conceptos como columna de entrada; las fuentes como evidencia, no protagonistas.
- Curvas que cruzan las cinco columnas: los puentes entre la mitad jurídica y la contable.
- Dos nodos «Derecho tributario» y dos «Finanzas y gestión» en la columna de temas, que leyó como
  «hub + sub-hub».

## Qué explicaba el código (1.27)

- Los nodos repetidos no eran sub-hubs: la última capa rotulaba **toda** nota con el nombre de su
  tema, así que dos notas con el mismo tema se veían iguales.
- El baricentro ordenaba solo por capas contiguas; las curvas largas eran dato puro, no layout.
- Su capa «Fuentes» no tenía relación con la función de fuentes crudas del plugin, pero la
  cabecera decía «fuentes» para ambas cosas.

## Qué cambió en 1.28 por este caso

1. Exportar datos (JSON con reglas de conteo + CSV) para no tener que reimplementar el motor.
2. Reglas de conteo escritas en el README y dentro del JSON.
3. Aviso en salud cuando varias notas comparten tema en la capa de temas.
4. Hub explícito con `hub: true`, anillo en el mapa; solo la hub lleva el nombre del tema.
5. «archivos citados» en la cabecera, en lugar de «fuentes».
6. El asistente arranca con la configuración actual y sirve de editor; comando para recargar `data.json`.
7. Validación al cargar: carpetas sin notas y notas fuera de toda capa.
8. Filtro «solo enlaces de largo alcance».
9. Baricentro ponderado por distancia de capa.
10. Plantilla «Profesional (jurídico, contable)» con sus cinco capas, junto a académico y Zettelkasten.
