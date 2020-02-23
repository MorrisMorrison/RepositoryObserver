FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash -  && \
    apt-get install -y build-essential nodejs && \
    npm install -g @angular/cli

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

RUN cd ClientApp && ng build

# RUN dotnet build -c Release -o out
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
RUN ls
COPY --from=build-env /app/out .
RUN mkdir wwwroot
COPY ClientApp/dist wwwroot
# CMD ASPNETCORE_URLS=https://*:$PORT ASPNETCORE_ENVIRONMENT=Development ASPNETCORE_HTTPS_PORT=$PORT dotnet RepositoryNotifier.dll


#ENV ASPNETCORE_URLS=https://*:$PORT
#ENV ASPNETCORE_ENVIRONMENT=Development

#ENTRYPOINT ["dotnet", "RepositoryObserver.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT ASPNETCORE_ENVIRONMENT=Development dotnet RepositoryObserver.dll
