module.exports = function Postgresql(scope) {
  drop = this;
  drop.install = function (done) {
    scope.applyConfig({
      image: "sameersbn/postgresql:latest",
      volumes: {
        data: '/var/lib/postgresql'
      }
    }, function (err) {
      if (err) throw err;
      scope.tailUntilMatch(/User:\s(\S+),\sPassword:\s(\S+)\s/, function (err, match) {
        if (err) throw err;
        scope.data.info = { user: match[1], password: match[2] }
        scope.save()
        done(null, scope.data.info)
      });
    });
  }

  drop.destroy = function (done) {
    scope.destroy(done);
  }

  drop.reinstall = function (done) {
    drop.destroy(function () {
      drop.install(done)
    })
  }
}
