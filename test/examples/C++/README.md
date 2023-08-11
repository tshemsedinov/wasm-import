# C++ for Node.js WebAssembly

- Install Emscripten

```
https://github.com/emscripten-core/emsdk.git
```

- Compile to wasm

```
em++ -std=c++11 example.cpp  -Os -s WASM=1 -s SIDE_MODULE=1 -o example.wasm
```
