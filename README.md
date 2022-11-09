# n00trals.xyz

This is the source of [https://n00trals.xyz](https://n00trals.xyz).

### Adapting for other clubs

This was built to work mostly out of the box with Netlify. Otherwise you'll need familiarity with building Javascript packages. Everything is provided as-is with no support.

- Update [package.json](./package.json) with the club description.
- Update [config.json](./config.json) with the club name, colors and traits.
- Update [netlify.toml](./netlify.toml) with the preview URL and the public URL if you plan on using Netlify.
- Update [./src/assets/json/members.json](./src/assets/json/members.json) with the member list
- Update [src/assets/favicon/site.webmanifest](./src/assets/favicon/site.webmanifest) with the club name.

#### Without Netlify

* Create `.env` and `.env.development` files based on [.env.sample](./.env.sample).
* Run `yarn install` to install all the dependencies.
* Run `yarn build` to build the production app.
* Run `yarn start-express-dev` to run the development app.

A script has been provided to update the member list via `yarn scrape`. If anyone has a better script that can get the data directly from the Blockchain, please reach out on Twitter to [n00trals](https://twitter.com/n00trals).
