# Sleep Recovery Store

Next.js storefront with a server-side Square payment endpoint.

## Local setup

1. Install a supported Node.js release and run `npm install`.
2. Copy `.env.example` to `.env.local` and configure your Square credentials.
3. Run `npm run dev`. Use `npm run build` to check a production build.

Set `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, and
`NEXT_PUBLIC_SQUARE_APP_ID` in the deployment provider before deploying.
Only `NEXT_PUBLIC_SQUARE_APP_ID` is intended for browser access.

## Credential cleanup

The formerly tracked `.env.local` has been removed from source control.
Rotate the old Square access token at Square, update the deployment environment,
and confirm checkout works. The removal does not revoke tokens or erase history.
Never commit the replacement token. See [SECURITY.md](SECURITY.md).
