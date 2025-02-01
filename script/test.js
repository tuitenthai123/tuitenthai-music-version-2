const nhaccuatuiApi = require("nhaccuatui-api");

const fetchdata = async () => {
  console.log(await nhaccuatuiApi.getHome());
};

fetchdata();
