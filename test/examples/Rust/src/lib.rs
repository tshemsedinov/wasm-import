#![allow(non_snake_case)]

use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "example")]
extern "C" {
  fn addCallback(res: i32);
  fn subCallback(res: i32);
}

#[wasm_bindgen]
pub fn sum(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) {
  addCallback(a + b)
}

#[wasm_bindgen]
pub fn sub(a: i32, b: i32) {
  subCallback(a - b)
}
