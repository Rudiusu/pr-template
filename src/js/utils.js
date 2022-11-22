const utils = {
  num2type: (num) => {
    switch (num) {
      case "0":
        return "title";
      case "1":
        return "text";
      case "2":
        return "image";
      case "3":
        return "video";
      case "4":
        return "image-with-text";
      case "5":
        return "image-grid";
    }
  },
};
export default utils;
