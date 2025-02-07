# Threads
This is a simple example of how to create threads with rust

## Requirements
You need to install rust first

```sh
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## How to run?

### Compilling
```sh
$ rustc src/main.rs
```

### Execute
```sh
$ ./main.rs
```

## How to run with cargo?
```sh
$ cargo run
```

## Output

Thread 1 rodando: 1
Thread 2 rodando: 1
Thread 1 rodando: 2
Thread 2 rodando: 2
Thread 1 rodando: 3
Thread 2 rodando: 3
Thread 1 rodando: 4
Thread 2 rodando: 4
Execução concluída!