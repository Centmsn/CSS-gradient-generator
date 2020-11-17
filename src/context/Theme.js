const { ThemeProvider } = require("styled-components");

const theme = {
  darkBlue: "rgb(8, 35, 92)",
  darkGray: "rgba(200, 200, 200)",
  mainFont: "'Inconsolata', monospace",
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
