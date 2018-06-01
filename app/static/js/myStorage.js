let myStorage;
const warning = '当前状态下localStorage不可用';
if (typeof localStorage === 'object') {
  myStorage = localStorage;
} else {
  myStorage = {
    getItem: () => {
      console.log(warning);
      return null;
    },
    setItem: () => {
      console.log(warning);
      return null;
    },
    removeItem: () => {
      console.log(warning);
      return null;
    },
    clear: () => {
      console.log(warning);
      return null;
    }
  };
}

export default myStorage;
