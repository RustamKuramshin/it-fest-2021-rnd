# Демо-проект для фестиваля IT Fest 2021

Страница [IT Fest 2021](https://itcube61.ru/)

- Запуск бэкенда


Открыть ```./backend``` в терминале. Собрать проект (требуется установленая Java 11 и Apache Maven) ```mvn clean package```.
Запустить проект ```java -jar backend/target/backend-0.0.1-SNAPSHOT.jar```.

- Запуск фронтенда

Открыть ```./frontend``` в терминале. Собрать проекта (требуется NodeJS) ```npm install```. Запустить live-server ```npm run start```.

Для запуска фронтеда с мок-сервером wiremock:
1. В файле ```frontend/src/BooksApiClient.ts``` указать tcp-порт 8081
2. Запустить в терминале мок-сервер ```./wiremock/run_wiremock.sh```