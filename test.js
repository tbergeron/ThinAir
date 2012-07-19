var p = Proxy.create({
  get: function(proxy, name) {
    console.log('read request to ' + name + ' property');
    if (name=="test_test")
       return 1234;
    else
       return "Meh";
  },
  set: function(proxy, name, value) {
    console.log('write request to ' + name + ' property with ' + value + ' value');
  }
});

console.log(p.test_test);
console.log(p.test)
p.qqq = "test";