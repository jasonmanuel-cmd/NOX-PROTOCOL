# Security

## Reporting a vulnerability

Use **Security → Report a vulnerability** in this repository when available.
If private reporting is unavailable, contact the repository owner privately
using their published contact options before sharing sensitive details.
Do not post credentials, personal data, or exploit details in a public issue.

Include the affected commit or version, a description of the impact, and
minimal reproduction steps with secrets and personal data removed.

## Handling credentials

Keep deployment credentials in the hosting provider's environment settings or
an ignored local environment file. Commit only empty example configuration.
If a credential is committed, revoke or rotate it at its provider; deleting
the file does not remove the credential from Git history or revoke access.

Archived projects are retained for reference and are not actively maintained.
