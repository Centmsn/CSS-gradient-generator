const { ThemeProvider } = require("styled-components");

const theme = {
  darkBlue: "rgb(8, 35, 92)",
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
