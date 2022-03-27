# Sam Dev Container

Example project for showing how to use AWS SAM local, Localstack, and DynamoDB Local with VS Code development containers.

1. Open the project with VS Code and open the development container
2. Docker compose is used to spin up the development container, the Localstack container, and the DynamoDB local container
3. All the containers will be spun up on the same custom docker network
4. Set the `CodeUri` in `template.yml` to the absolute path to your project (outside of docker)
5. Run SAM Local using `sam local start-api --container-host 'host.docker.internal'`
6. Use `curl` or something else to make the API call to the service. ex `curl http://127.0.0.1:3000/`

_Note_ The same options are likely needed when running other variants of the `sam local` commands
