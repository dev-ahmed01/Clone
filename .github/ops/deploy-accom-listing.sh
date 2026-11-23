#!/usr/bin/env bash
# Installed once as root-owned /usr/local/sbin/deploy-accom-listing.
# This file is never executed directly from the writable Git checkout.
set -Eeuo pipefail

readonly REPO=/opt/apps/Accom-Listing/src
readonly COMPOSE=/opt/apps/Accom-Listing/compose.yaml
readonly PUBLIC="$REPO/accom-design-prototype/public"

exec 9>/run/lock/accom-listing-deploy.lock
flock -w 120 9

[[ -f "$COMPOSE" && -d "$PUBLIC" ]] || {
  echo 'ERROR: Accom deployment paths are not present.' >&2
  exit 1
}

branch="$(runuser -u deploy -- git -C "$REPO" symbolic-ref --short HEAD)"
[[ "$branch" == main ]] || {
  echo "ERROR: Expected server checkout on main, found: $branch" >&2
  exit 1
}

status="$(runuser -u deploy -- git -C "$REPO" status --porcelain)"
[[ -z "$status" ]] || {
  echo 'ERROR: Server checkout has uncommitted changes. Aborting deployment.' >&2
  printf '%s\n' "$status" >&2
  exit 1
}

runuser -u deploy -- git -C "$REPO" fetch origin main
runuser -u deploy -- git -C "$REPO" merge --ff-only origin/main
sha="$(runuser -u deploy -- git -C "$REPO" rev-parse HEAD)"
echo "Deploying Accom commit $sha"

chmod -R a+rX "$PUBLIC"
docker compose -f "$COMPOSE" config --quiet
docker compose -f "$COMPOSE" up -d --build

for page in listing.html listing-page-2.html listing-page-3.html; do
  echo "Verifying $page"
  matched=0
  for attempt in $(seq 1 20); do
    if curl --max-time 15 -fsSL \
      -H 'Cache-Control: no-cache' \
      "https://skillsalazar.com/$page?deploy=$sha" \
      | cmp -s "$PUBLIC/$page" -; then
      matched=1
      break
    fi
    echo "$page not ready/matching yet (attempt $attempt/20)"
    sleep 3
  done
  if [[ "$matched" != 1 ]]; then
    echo "ERROR: Live $page did not exactly match the deployed file." >&2
    docker compose -f "$COMPOSE" ps || true
    docker logs --tail 50 accom-listing-web || true
    exit 1
  fi
  echo "$page: LIVE - EXACT MATCH"
done

echo "SUCCESS: Accom production serves commit $sha"
