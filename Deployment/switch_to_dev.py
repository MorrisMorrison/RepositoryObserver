import os
import json
import fileinput

startup_path = '../RepositoryNotifier/Startup.cs'
angular_path = '../RepositoryNotifier/ClientApp/angular.json'

with open(angular_path, 'r') as angular_json_file:
    data = json.load(angular_json_file)
    data['projects']['RepositoryNotifier']['architect']['build']['options']['outputPath'] = 'dist'

os.remove(angular_path)
with open(angular_path, 'w') as f:
    json.dump(data, f, indent=4)


text_to_search = 'app.UseSpaStaticFiles();'
replacement_text =  '// app.UseSpaStaticFiles();'

with fileinput.FileInput(startup_path, inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace(text_to_search, replacement_text), end='')


text_to_search = 'routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Fallback", action = "Index" });'
replacement_text =  '// routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Fallback", action = "Index" });'    

with fileinput.FileInput(startup_path, inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace(text_to_search, replacement_text), end='')






