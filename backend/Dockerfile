FROM maven as build
WORKDIR /app

COPY src src/
COPY pom.xml .

RUN mvn -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true clean package
RUN cp ./target/backend-*.jar ./backend.jar


FROM adoptopenjdk/openjdk11:jdk-11.0.11_9-alpine-slim
WORKDIR /app
COPY --from=build /app/backend.jar ./backend.jar
ENTRYPOINT ["java","-jar","backend.jar"]