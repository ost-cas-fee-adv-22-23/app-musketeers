# Musketeer's Mumble App

People say this app could easily replace twitter. You know.. people say.

## Musketeer's Production URL

Our production enviroment can be accessed via following URL

https://app-musketeers.vercel.app

## Setup

### 1. Node/NPM Version

There is a .nvmrc file included, in case you use NVM for local node version management.
Just type `$nvm use` in the projects folder, and NVM determines the correct Node version based on the configuration.

### 2. GitHub Registry AuthToken

In order to access all packages used in this repository you need to create a registry personal access token.
This can be reached following these steps.

1. Go to Github Settings
2. Go to Developer Settings
3. Go to Personal Access Token
4. Click Generate Token, Set token lifetime and token right's

Now you need to create a **.npmrc** file in the root where you paste your token in order to authenticate against the register which we try to access.

```bash
@smartive-education:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

### 3. Local Environment Variables

In order to run the repository localy we need to feed next.js with some variables.
Create the following file **.env** in the project root with the following content.

```bash
NEXT_PUBLIC_API_BASE_URL={URL_TO_API}
ZITADEL_CLIENT_ID={ZITADEL_CLIENT_ID}
ZITADEL_ISSUER={ZITADEL_ISSUER}
NEXTAUTH_SECRET={NEXTAUTH_SECRET}
```

Get in touch with the Smartive-G's to access the variables. Replace the placeholders then.

## Getting Started

### Installation Commands

Run the following command to install all dependencies from package.json.

```bash
npm install
```

### Development Commands

#### Running local dev server

```bash
npm run dev
```

#### Building the project

```bash
npm run build
```

#### Running local build

```bash
npm run start
```

## Development guidelines

### Conventions

#### Ticketing

We created feature tickets in order to keep track what we are working on

https://trello.com/b/BK3h5ADR/mumble

#### Variable Naming

We used following variable naming convention

https://github.com/kettanaito/naming-cheatsheet

#### Branch Naming

We used following branch naming convention

https://deepsource.com/blog/git-branch-naming-conventions/

### Rendering Strategies

All our pages are follwing the SSR strategie combiend with CSR. (Except Login and NotFound Page which are by default Static, no Logic needed)
We went for this strategie because of these criterias.

- Scalability is not really there, when rendering static
- App contains a lot of dynamic components which are changing a lot
- Performance is good enough with SSR

### State Manangement

Except from the Auth custom hooks, there is not much shared client state. Therefore, we decided to use plain state hooks like **useState**, **useReducer** and **React Context - Provider**.

### REST

We decided that for our application scope the native Fetch API will be enough to handle our request cases. Therefore, we are not using any request library.

The problem with SWR was, that we wanted to use our existing service architecture. And the useSwrInfinite hook as example, provides currentPage for the getKey method only, and is not passing any infos about the paging to the fetcher function.

### Docker

To build Mumble as a Docker image locally, you need a local .npmrc file with the credentials for the Smartive Github Organisation credentials.
$docker build -t app-musketeers . --secret id=npm,src=.npmrc

### Terraform

Configuration is included and will build the Docker Image for GCP automatically, on every merge to the main branch.

### Unit and Integration Tests

To let run the Jest / Tesing Library based Unit and Integration tests, run

```bash
npm run test
```

### E2E Setup

In order to run E2E Playwright tests you need to run following commands.

If project installation not done then firstly run

```bash
npm install
```

If project installation is done, we need to install playwrights browser engines which are defined in playwright.config.ts. This command will download all engines needed in order to run the UI mode.

```bash
npx playwright install
```

### E2E Running

**Headless mode**

Runs E2E tests without browser poping up. Results of the tests and test logs will be shown in the terminal.

```bash
npx playwright test
```

**UI mode**

Run your tests with UI Mode for a better developer experience with time travel debugging, watch mode and more.

```bash
npx playwright test --ui
```
