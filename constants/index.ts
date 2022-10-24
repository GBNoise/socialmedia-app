// navbar height || same value as the one in _vars.scss
export const NAV_HEIGHT = "50px";

//sidebarWidth || same value as the one in _vars.scss
export const SIDEBAR_WIDTH = "350px";

// array which includes paths where sidebar won't be active
export const NO_SIDEBAR_ROUTES = [
  "/auth",
  "/terms-of-service",
  "/privacy-policy",
  "/payment-policy",
];

export const formatK = (quantity: number) => {
  if (quantity >= 1000) return `${quantity / 1000}k`;
  return quantity;
};

export const saveToLocalStorage = (name: string, value: string) => {
  value = JSON.stringify(value);
  localStorage.setItem(name, value);
};

export const getFromLocalStorage = (name: string) => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};
