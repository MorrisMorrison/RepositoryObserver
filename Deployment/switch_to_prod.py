import os
import json
import fileinput

startup_path = '../RepositoryObserver/Startup.cs'
angular_path = '../RepositoryObserver/ClientApp/angular.json'

with open(angular_path, 'r') as angular_json_file:
    data = json.load(angular_json_file)
    data['projects']['RepositoryNotifier']['architect']['build']['options']['outputPath'] = '../repositoryobserver/wwwroot'

os.remove(angular_path)
with open(angular_path, 'w') as f:
    json.dump(data, f, indent=4)


text_to_search = '// app.UseSpaStaticFiles();'
replacement_text =  'app.UseSpaStaticFiles();'

with fileinput.FileInput(startup_path, inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace(text_to_search, replacement_text), end='')


text_to_search = '// routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Fallback", action = "Index" });'
replacement_text =  'routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Fallback", action = "Index" });'    

with fileinput.FileInput(startup_path, inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace(text_to_search, replacement_text), end='')


config_file_path = '../RepositoryObserver/appsettings.Development.json'
with open(config_file_path, 'r') as config_file:
    data = json.load(config_file)
    data['Mongo']['ConnectionString'] = 'mongodb://heroku_3jjpqjns:2d48lnsc4s2fr6tmc2k575i891@ds135786.mlab.com:35786/heroku_3jjpqjns'
    data['Mongo']['Database'] = 'heroku_3jjpqjns'

    data['Serilog']['WriteTo'][1]['Args']['databaseUrl'] = 'mongodb://heroku_3jjpqjns:2d48lnsc4s2fr6tmc2k575i891@ds135786.mlab.com:35786/heroku_3jjpqjns'
    data['Serilog']['WriteTo'][1]['Args']['collectionName'] = 'log'


os.remove(config_file_path)
with open(config_file_path, 'w') as f:
    json.dump(data, f, indent=4)



