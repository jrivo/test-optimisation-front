export function storeItem(itemName, item) {
    if (typeof window !== "undefined") {
      localStorage.setItem(itemName, JSON.stringify(item));
    }
  }

  export function getUser() {
    var user = null;
    if (typeof window !== "undefined")
      user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return user;
  }

  export function removeUser() {
    if (typeof window !== "undefined") localStorage.removeItem("user");
  }