import os


os.system('cd .. && cd RepositoryObserver/ClientApp && ng build')
os.system('python3 switch_to_prod.py')
os.system('cd .. && cd RepositoryObserver && sudo docker build -t repositoryobserver .')
os.system('cd .. && cd RepositoryObserver && sudo heroku container:push web -a repositoryobserver')
os.system('cd .. && cd RepositoryObserver && sudo heroku container:release web -a repositoryobserver')
os.system('python3 switch_to_dev.py')
