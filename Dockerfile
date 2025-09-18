FROM mcr.microsoft.com/azure-sql-edge:latest

USER root
RUN apt-get -y update && apt-get install -y dos2unix
COPY docker /usr/src/app
RUN dos2unix /usr/src/app/*.sh || true
USER mssql

EXPOSE 1433