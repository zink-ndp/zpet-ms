
export function nonEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == "" || arguments[i] == null || arguments[i].length == 0 || arguments[i] == undefined){
        return false;
    }
  }
  return true;
}

export function validateEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function formatMoney(string) {
  let money = string.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
  return money;
}

// export const isValidDate = (date) => {
//   const systemDate = new Date()
//   if (date)
// }


export function renderDOMElement(element) {
  const { type, props, children } = element;

  const domElement = document.createElement(type);

  for (let prop in props) {
    if (prop.startsWith("on")) {
      const eventName = prop.substring(2).toLowerCase();
      domElement.addEventListener(eventName, props[prop]);
    } else if (prop === "innerHTML") {
      domElement.innerHTML = props[prop];
    } else {
      domElement[prop] = props[prop];
    }
  }

  if (children) {
    if (typeof children === "string") {
      const textNode = document.createTextNode(children);
      domElement.appendChild(textNode);
    } 
    else if (Array.isArray(children)) {
      children.forEach((child) => {
        if (typeof child === "string") {
          const textNode = document.createTextNode(child);
          domElement.appendChild(textNode);
        } else {
          const childElement = renderDOMElement(child);
          domElement.appendChild(childElement);
        }
      });
    }
  }


  return domElement;
}