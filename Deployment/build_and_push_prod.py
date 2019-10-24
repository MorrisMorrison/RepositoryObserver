import os


os.system('cd .. && cd RepositoryNotifier/ClientApp && ng build')
os.system('python3 switch_to_prod.py')
os.system('cd .. && cd RepositoryNotifier && sudo docker build -t repositoryobserver')
os.system('cd .. && cd RepositoryNotifier && sudo heroku container:push web -a repositoryobserver')
os.system('cd .. && cd RepositoryNotifier && sudo heroku container:release web -a repositoryobserver')
# os.system('python3 switch_to_dev.py')
