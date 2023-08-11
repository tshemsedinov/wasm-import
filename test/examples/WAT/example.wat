(module
  (import "example" "addCallback" (func $addCallback (param i32)))
  (import "example" "subCallback" (func $subCallback (param i32)))
  (func $sum (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "sum" (func $sum))
  (func $add (param $lhs i32) (param $rhs i32)
    local.get $lhs
    local.get $rhs
    i32.add
    call $addCallback)
  (export "add" (func $add))
  (func $sub (param $lhs i32) (param $rhs i32)
    local.get $lhs
    local.get $rhs
    i32.sub
    call $subCallback)
  (export "sub" (func $sub))
)
