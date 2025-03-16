export const initialState = {
    theme: "light"
  };
  
  export function themeReducer(state, action) {
    switch (action.type) {
      case "light": {
        return {
          theme: "light"
        };
      }
      case "dark": {
        return {
          theme: "dark"
        };
      }
      default: {
        return state;
      }
    }
  }
  