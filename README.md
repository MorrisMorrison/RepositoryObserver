# RepositoryNotifier 
This project allows users to create notifications when specific keywords appear in their repositories.
The user has to authenticate via Githubs API and is then able to create Tasks to search for keywords in their repositories.
Every task is executed after a specific time the user selected.
The system defines the frequencies the user can select.
Predefined are:
* 15 minutes
* 30 minutes
*  1 hour
*  3 hours
* 12 hours
*  1 day
*  3 days
Every user can only create one task for each frequency there is, but attach multiple repositories and keywords to the task.


## Run Application
You need:
* Git
* Docker

```
git clone https://github.com/MorrisMorrison/RepositoryNotifier
cd RepositoryNotifier
```

To run the application you need to provide the information in appsettings.json

```
docker build -t repositorynorifier RepositoryNotifier/
docker run -d -p 8080:80 --name myapp repositorynotifier
```

Go to https://localhost:8080

### ToDo
* add support for multiple search keywords
* improve style
* refactoring

### This project was used to learn following technologies
* .NET Core
* Docker
* MongoDB
* Github API
* PayPal API
