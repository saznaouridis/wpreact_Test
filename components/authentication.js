var WPAPI = require("wpapi/superagent");
var wp = new WPAPI({
  endpoint: "http://wpchamber.knowledge.gr/wp-json",
  // This assumes you are using basic auth, as described further below
  //TODO ΝΑ ΜΗΝ ΤΑ ΕΧΕΙΣ ΚΑΡΦΩΤΑ ΓΤ ΦΑΙΝΟΝΤΑΙ ΣΤΟ CONSOLE ΠΕΡΝΑ ΤΑ  ΣΕ .ENV
  username: "domains_2pvbq15q",
  password: "y$~8hLi1~EwGlsD6",
});
export default wp;
