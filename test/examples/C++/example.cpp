#include <emscripten/emscripten.h>

int main() {
  return 0;
}

extern "C" {
  extern void addCallback(int res);
  extern void subCallback(int res);

  EMSCRIPTEN_KEEPALIVE int sum(int a, int b) {
    return a + b;
  }

  EMSCRIPTEN_KEEPALIVE void add(int a, int b) {
    int res = a + b;
    addCallback(res);
  }

  EMSCRIPTEN_KEEPALIVE void sub(int a, int b) {
    int res = a - b;
    subCallback(res);
  }
}
