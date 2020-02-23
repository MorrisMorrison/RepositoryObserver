# RepositoryObserver
When I first started out using GitHub, I accidentally pushed a file to a public repository, which contained a password of my local development DB.
Because I was looking for a new pet project to try out some new technologies with at this time, I decided to create a simple SaaS-like application to solve this problem. (For practice purposes only)

This project allows users to get notifications via email, sms or whatsapp, when specific keywords appear in their repositories.
The user has to authenticate via GitHub and is then able to create scheduled jobs or add webhooks to search for keywords in their repositories.

### Scheduled Jobs
Every job is executed after a specific time the user selected.
The system defines the frequencies the user can select.

### Webhooks
The user can also allow the application to create webhooks for repositories that need to be observerd.
Every time a commit is made to that repository, the application searches for the specified keywords.

#### This project was built using following technologies
##### Backend
* .NET Core
* MongoDB
* Github API
* PayPal API
* OAuth

##### Frontend
* Angular
* Typescript
* Bootstrap

##### Ops
* Github
* Docker
* Heroku

## Run Application
required:
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

Go to https://localhost:5001



