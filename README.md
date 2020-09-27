# scrape-notifications 

Scrape sites for info and push notifications with pushed.co when matching content is found.

## Usage
```
export PUSHED_API_KEY=...
export PUSHED_API_SECRET=...
```

See [config.yaml](config.yaml) for config info.

## Deploying
```
git remote add dokku dokku@trombs.com:scrape-notifications
dokku config:set scrape_notifications NEW_RELIC_LICENSE_KEY=... PUSHED_API_KEY=... PUSHED_API_SECRET=...
git push dokku head
```