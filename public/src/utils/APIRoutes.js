const host = "http://localhost:5000";

export const APIRoutes = {
  host: `${host}`,
  login: `${host}/api/login`,
  register: `${host}/api/register`,
  setAvatar: `${host}/api/setavatar`,
  getAllUsers: `${host}/api/allusers`,
  sendMessage: `${host}/api/addmsg`,
  getAllMessages: `${host}/api/getmsg`,
};
