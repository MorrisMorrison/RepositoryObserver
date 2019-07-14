cd RepositoryNotifier
cd ClientApp
ng build
cd ..
docker build -t repositoryobserver .
heroku container:push web -a repositoryobserver
heroku container:release web -a repositoryobserver