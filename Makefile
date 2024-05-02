include .env.local

release:
	GITHUB_TOKEN=${GH_TOKEN} npm run release
