#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["bloglist-backend-cs/bloglist-backend-cs.csproj", "bloglist-backend-cs/"]
RUN dotnet restore "bloglist-backend-cs/bloglist-backend-cs.csproj"
COPY . .
WORKDIR "/src/bloglist-backend-cs"
RUN dotnet build "bloglist-backend-cs.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "bloglist-backend-cs.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "bloglist-backend-cs.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet bloglist-backend-cs.dll