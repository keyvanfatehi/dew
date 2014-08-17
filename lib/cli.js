var _ = require('lodash')

module.exports = {
  parse: function (argv, app) {
    var dropName = argv._[0];
    var action = argv._[1];
    var DewDrop = app.drops[dropName];
    return {
      DewDrop: DewDrop,
      dropName: dropName,
      action: action
    }
  },
  run: function (argv, app) {
    var intent = this.parse(argv, app)
      , dropName = intent.dropName
      , action = intent.action
      , DewDrop = intent.DewDrop
      , Drop = DewDrop(argv, app)
      , drop = new Drop()
    if (action) {
      if (drop[action]) {
        drop[action](function (err, res) {
          if (err) throw err;
          if (res) {
            if (_.isObject(res)) {
              console.log(JSON.stringify(res, null, 4));
            } else console.log(res)
          }
        });
      } else {
        console.log("Cannot '"+action+"' this drop");
      }
    } else {
      var attrs = Object.keys(drop.__proto__);
      console.log("Available commands: ");
      _.each(attrs, function (e) {
        if (_.isFunction(drop[e])) {
          console.log(" - "+e);
        }
      })
    }
  }
}
