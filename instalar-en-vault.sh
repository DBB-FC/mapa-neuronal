#!/usr/bin/env bash
# Instala el build en un vault de Obsidian. El código vive acá; el vault recibe el resultado.
#
#   ./instalar-en-vault.sh                 usa $BRAIN_DIR
#   ./instalar-en-vault.sh /ruta/al/vault
#
# NO toca data.json: esa es la configuración del usuario de ese vault.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

VAULT="${1:-${BRAIN_DIR:-}}"
[ -n "$VAULT" ] || { echo "Falta la ruta del vault (o exporta BRAIN_DIR)."; exit 1; }
[ -d "$VAULT/.obsidian" ] || { echo "No parece un vault de Obsidian: $VAULT"; exit 1; }

npm test --silent >/dev/null || { echo 'Las pruebas no pasan: no se instala nada.'; exit 1; }
DESTINO="$VAULT/.obsidian/plugins/mapa-neuronal"
mkdir -p "$DESTINO"
cp main.js manifest.json styles.css "$DESTINO/"
echo "Instalado en $DESTINO (version $(node -p "require('./manifest.json').version"))."
echo "Reinicia Obsidian, o desactiva y reactiva el plugin, para que cargue."
