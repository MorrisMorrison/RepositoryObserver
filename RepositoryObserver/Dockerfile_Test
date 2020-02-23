FROM microsoft/dotnet:2.2-sdk AS base
WORKDIR /src

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash -  && \
    apt-get install -y build-essential nodejs && \
    npm install -g @angular/cli

COPY RepositoryObserver.csproj .
RUN dotnet restore "RepositoryObserver.csproj"
COPY . .
RUN cd ClientApp && ng build

RUN dotnet build "RepositoryObserver.csproj" -c Release -o /app/build

RUN dotnet publish "RepositoryObserver.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
RUN mkdir wwwroot
COPY ClientApp/dist wwwroot
COPY --from=base /app/publish .

ENV ASPNETCORE_URLS=http://*:$PORT
ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "RepositoryObserver.dll"]

#CMD dotnet RepositoryObserver.dll
#CMD ASPNETCORE_URLS=http://*:$PORT ASPNETCORE_ENVIRONMENT=Development dotnet RepositoryObserver.dll
