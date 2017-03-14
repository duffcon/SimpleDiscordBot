# Dependencies

Installing and setting up nodejs

---

Install latest version.
```bash
sudo apt-get update
sudo apt-get upgrade
```

```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Check version installed.
```bash
npm -v
node -v
```
mine were 4.1.2 and 7.7.2.

Initialize project. Follow steps to create a package.json file.

```bash
npm init
```

Install local copy of packages in node_modules folder. Ignore "UNMET PEER DEPENDENCY".

```bash
npm install --save discord.js
npm install --save discord.js-commando
npm install --save pg
```



discord.js-commando is an extension of discord.js with more command capabilities. This is what we will use to communicate with our discord server. pg will be used to communicate with our database.

create index.js file and add the following line:

```javascript
console.log("Hello World");
```

Go to project folder and type:

```bash
node .
```

If you see "Hello World" you are all set.

### References
https://nodejs.org/en/download/package-manager/
