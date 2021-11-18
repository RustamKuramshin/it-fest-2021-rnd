FROM openjdk:8-jdk-alpine
WORKDIR /workspace/app

COPY .gradle .gradle/
COPY gradle gradle/
COPY src src/

COPY gradlew .
COPY build.gradle.kts .
COPY settings.gradle.kts .

RUN chmod +x ./gradlew
RUN ./gradlew assemble -i
RUN cp ./build/libs/*.jar ./app.jar
ENTRYPOINT ["java","-jar","app.jar"]