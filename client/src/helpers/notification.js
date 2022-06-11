import { notification } from "antd";

const notify = (type, message, description) => {
  // eslint-disable-next-line array-callback-return
  notification[type]({
    message,
    description,
  });
};

export default notify;
