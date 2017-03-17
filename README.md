# SimpleDiscordBot

This is a simple discord bot that counts the number of messages each user sends and saves it to a database using nodejs, postgres, and javascript. This uses the discord.js-commando package rather than just discord.js. This was developed on Debian.

---

If you are new to javascript, databases, ect. I have saved the process I went through on separate branches. The readme's on each branch are a mix of personal notes and a tutorial you are welcome to use.

## Cloning all branches

If you clone the repository you won't have all the branches, here is how to get all of them:

```bash
git clone https://github.com/duffcon/SimpleDiscordBot.git
git branch -a
```



```bash
for branch in $(git branch --all | grep '^\s*remotes' | egrep --invert-match '(:?HEAD|master)$'); do
    git branch --track "${branch##*/}" "$branch"
done

git fetch --all
git pull --all
```

## References
http://stackoverflow.com/questions/67699/how-to-clone-all-remote-branches-in-git
