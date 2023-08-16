# Zig for WebAssembly

- Install zig compiler for your platform

```
https://ziglang.org/download/
```

- Compile to wasm

```
zig build-lib example.zig -dynamic -target wasm32-freestanding -rdynamic
```

- Disclaimer

The instruction from above is valid as of zig compiler version 0.11.0 and can
be found [here](https://ziglang.org/documentation/0.11.0/#WebAssembly).
The language is rapidly developing and so if you have a zig compiler of a different
version and have issues with compiling to wasm, please address the docs.
