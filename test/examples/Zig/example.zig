extern fn addCallback(i32) void;
extern fn subCallback(i32) void;

export fn sum(a: i32, b: i32) i32 {
    return a + b;
}

export fn add(a: i32, b: i32) void {
    addCallback(a + b);
}

export fn sub(a: i32, b: i32) void {
    subCallback(a - b);
}