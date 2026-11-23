# Accom listing: one-time Contabo auto-deploy setup

The GitHub workflow `.github/workflows/accom-deploy-contabo.yml` runs when
`accom-design-prototype/**` changes on `main` or when manually dispatched.
It SSHes with a dedicated restricted key and executes the root-owned
`/usr/local/sbin/deploy-accom-listing` wrapper; it does not grant CI general
shell access or passwordless `docker`.

## 1. Run once on Contabo as `deploy`

```bash
set -e
cd /opt/apps/Accom-Listing/src
[ -z "$(git status --porcelain)" ] || { echo 'Local changes: resolve before setup'; exit 1; }
git fetch origin main
git merge --ff-only origin/main
sudo install -o root -g root -m 0755 \
  .github/ops/deploy-accom-listing.sh /usr/local/sbin/deploy-accom-listing
printf '%s\n' 'deploy ALL=(root) NOPASSWD: /usr/local/sbin/deploy-accom-listing' \
  | sudo tee /etc/sudoers.d/accom-deploy >/dev/null
sudo chmod 0440 /etc/sudoers.d/accom-deploy
sudo visudo -cf /etc/sudoers.d/accom-deploy

install -d -m 700 "$HOME/.ssh"
[ ! -e "$HOME/.ssh/accom_github_actions" ] || { echo 'Existing CI key: do not overwrite'; exit 1; }
ssh-keygen -t ed25519 -a 64 -f "$HOME/.ssh/accom_github_actions" -N '' \
  -C 'accom-github-actions'
printf 'restrict,command="sudo -n /usr/local/sbin/deploy-accom-listing" %s\n' \
  "$(cat "$HOME/.ssh/accom_github_actions.pub")" >> "$HOME/.ssh/authorized_keys"
chmod 600 "$HOME/.ssh/authorized_keys"
```

## 2. Copy TWO values to GitHub secrets

Go to the repository's **Settings > Secrets and variables > Actions > New
repository secret**. Do not paste these values into chats, issues or commits.

- `ACCOM_DEPLOY_SSH_KEY`: complete output of
  `cat "$HOME/.ssh/accom_github_actions"` (private key, with both BEGIN/END lines).
- `ACCOM_DEPLOY_KNOWN_HOSTS`: output of
  `awk '{print "91.90.83.21 "$1" "$2}' /etc/ssh/ssh_host_ed25519_key.pub`
  (this is the trusted server's actual public host key, **not** `ssh-keyscan`
  output captured from an unverified network).

## 3. Test the first deployment

GitHub > **Actions** > **Deploy Accom listing to Contabo** > **Run workflow**
(select `main`). The job verifies all three public pages exactly match the
server checkout. A temporary 502 while Docker starts is retried.

After verifying the CI workflow, you can delete the unneeded copy of the
private CI key from the VPS: `rm "$HOME/.ssh/accom_github_actions"`.
The public key must remain in `authorized_keys`.

## Subsequent changes

Push/merge Accom updates to `main`; GitHub Actions automatically deploys.
Commits only on a feature branch do **not** deploy, intentionally.

If deployment fails, inspect the GitHub Actions job logs. It will stop rather
than overwriting uncommitted server changes, taking the site off a different
branch, or silently accepting mismatched public HTML.
