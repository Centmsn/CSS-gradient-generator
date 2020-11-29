const { ThemeProvider } = require("styled-components");

const theme = {
  darkBlue: "rgb(8, 35, 92)",
  lightBlue: "rgb(38, 150, 201)",
  darkGray: "rgb(200, 200, 200)",
  darkRed: "rgb(163, 23, 13)",
  mainFont: "'Inconsolata', monospace",
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
