# RepositoryObserver
This project allows users to get notifications via email, sms or whatsapp, when specific keywords appear in their repositories.
The user has to authenticate via Githubs API and is then able to create scheduled jobs or github webhooks to search for keywords in their repositories.

### Scheduled Jobs
Every job is executed after a specific time the user selected.
The system defines the frequencies the user can select.
Predefined are:
* 15 minutes
* 30 minutes
*  1 hour
*  3 hours
* 12 hours
*  1 day
*  3 days

### Webhooks
The user can also allow the application to create webhooks for repositories that need to be observerd.
Every time a commit is made to that repository, the application searches for the specified keywords.

## Run Application
You need:
* Git
* Docker

```
git clone https://github.com/MorrisMorrison/RepositoryObserver
cd RepositoryObserver
```

To run the application you need to provide configuration data in appsettings.json for production mode and in appsettings.Development.json for the development mode.
A template for those files is provided in appsettings.template.json .

```
docker build -t repositorynotifier RepositoryObserver/
docker run -d -p 8080:80 --name myapp repositoryobserver
```

Go to https://localhost:8080


### This project was used to learn following technologies
* .NET Core
* Angular
* Typescript
* Docker
* MongoDB
* Github API
* PayPal API
