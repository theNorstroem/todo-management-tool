# Creating an enterprise-flavoured ToDo application from scratch with the Furo Web Stack

- _Repository_: https://github.com/theNorstroem/todo-management-tool
- _Furo Web Stack_: https://furo.pro/

## Getting Started
We recommend 2+ years of programming experience in JavaScript / HTML / CSS and a basic knowledge of Protocol Buffers. Experiences in Go is also a plus. But don’t worry, you don’t have to be an expert.

> Start with the first chapter: git checkout c01_todos_api_contract

## Local Development

### Use local container build
[Furo build environment docker container](https://github.com/theNorstroem/furoBEC)

https://hub.docker.com/r/thenorstroem/furo-bec

```shell script
docker pull thenorstroem/furo-bec:v1.35.1
```

Example Usage: docker run -it --rm -v $(pwd):$pwd/specs -v ~/.ssh:/root/.ssh thenorstroem/furo-bec:v1.35.1

`furo install` runs the dependency installer
`furo` runs the standard flow from the .furo file
`furo run build` runs the build flow from the .furo file

```shell script
フロー BEC # furo install
フロー BEC # furo 
フロー BEC # furo run build
```

Commands: https://furo.pro/docs/commands/