## Setup Typescript express Project in ur Local machine

1.

```
npm init -y
```

2.

```
npm i -D typescrit
```

3.

```
tsc --init
```

4.

```
Add there script in package.json

{
    "test": "echo \"Error: no test specified\" && exit 1",
    "prestart": "npm run build",
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently \"npm run watch\" \"npm start\" "
  }

```

5.

```
npm run dev
```
