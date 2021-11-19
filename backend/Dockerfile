FROM adoptopenjdk/openjdk11:jdk-11.0.11_9-alpine-slim as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

CMD ./mvnw clean package
CMD cp ./target/backend-0.0.1-SNAPSHOT.jar ./backend-0.0.1-SNAPSHOT.jar


FROM adoptopenjdk/openjdk11:jdk-11.0.11_9-alpine-slim
WORKDIR /workspace/app
COPY --from=build /workspace/app/backend-0.0.1-SNAPSHOT.jar ./backend-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar.jar"]