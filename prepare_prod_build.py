import fileinput
import sys

lines_to_comment = [
    "spa.UseAngularCliServer(npmScript: \"start\"",
    "routes.MapSpaFallbackRoute(",
    "name: \"spa-fallback\",",
        ""    


]

for line in fileinput.input("RepositoryNotifier/Startup.cs", inplace=1):
    if line in lines_to_comment:


with open("RepositoryNotifier/Startup.cs", "w") as startup:
    for line in startup:
        if ("spa.UseAngularCliServer(npmScript: \"start\")" in line):
            if ("//" in line):
                line = "spa.UseAngularCliServer(npmScript: \"start\")"
            else:
                line = "//spa.UseAngularCliServer(npmScript: \"start\")"




