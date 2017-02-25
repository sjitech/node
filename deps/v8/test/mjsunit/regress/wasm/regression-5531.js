// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --expose-wasm

load("test/mjsunit/wasm/wasm-constants.js");
load("test/mjsunit/wasm/wasm-module-builder.js");

(function() {
  var builder = new WasmModuleBuilder();
  builder.addMemory(1, 1, false);
  builder.addFunction("foo", kSig_i_v)
    .addBody([
              kExprI32Const, 0x00,
      kExprI8Const, 0xcb,
      kExprI8Const, 0xff,
      kExprBrTable, 0xcb, 0xcb, 0xcb, 0x00, 0x00, 0xcb, 0x00 // entries=1238475
              ])
              .exportFunc();
  assertThrows(function() { builder.instantiate(); });
})();
