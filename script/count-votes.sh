#!/usr/bin/env bash

set -euo pipefail

FILE="${1:-}"

if [[ -z "$FILE" ]]; then
  echo "Usage: $0 <file.jsonl>"
  exit 1
fi

if [[ ! -f "$FILE" ]]; then
  echo "File not found: $FILE"
  exit 1
fi

jq -s '
  # Collect all star arrays
  map(.stars) as $allStars |

  # Determine number of games (length of stars array)
  ($allStars[0] | length) as $gameCount |

  # For each game index, calculate average
  [range(0; $gameCount) as $i |
    (
      ($allStars | map(.[ $i ]) | add)
      /
      ($allStars | length)
    )
  ]
' "$FILE"