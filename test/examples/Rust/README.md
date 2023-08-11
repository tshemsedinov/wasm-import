# Rust for Node.js WebAssembly

- Install rust
  - For fedora:
```
sudo dnf install rust cargo
```
- Install wasm32-unknown-unknown
  - For fedora:
```
sudo dnf install rust-std-static-wasm32-unknown-unknown
```
- Install wasm-pack
```
cargo install wasm-pack
```
- See/edit `Cargo.toml`
- Compole example:
```
wasm-pack build --target nodejs
```
