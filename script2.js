//ques2
window.addEventListener("load", () => {
    console.log(`${new Date().toISOString()} , view , page-load`);
  });
   function getElementType(tag, target) {
    switch (tag) {
      case "p": return "text";
      case "img": return "image";
      case "a": return "hyperlink";
      case "li": return "list-item";
      case "button": return "button";
      case "h1":
      case "h2":
      case "h3": return "heading";
      case "select": return "drop-down";
      case "input":
        if (target.type === "checkbox") return "checkbox";
        if (target.type === "radio") return "radio-button";
        return "input-field";
      case "div": return "container";
      default: return "unknown";
    }
  }
  document.addEventListener("click", function (event) {
    const tag = event.target.tagName.toLowerCase();
    const type = getElementType(tag, event.target);
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} , click , ${type}`);
  });
  