// Common layout styles
export const containerStyles = {
  fullScreenCenter:
    "flex items-start justify-center h-screen bg-gray-900 md:min-h-screen ",
  fullWidthCenter: "flex items-center justify-center w-full",
  card: "w-full max-w-4xl p-10 text-white bg-gray-800 rounded-lg shadow-2xl",
  achievementsCard:
    "w-full max-w-md md:w-96 p-8 mx-auto text-white bg-gray-700 rounded-lg shadow-lg",
  progressContainer: "flex items-center justify-center mb-6",
  formGroup: "flex flex-col md:flex-row md:gap-6",
  centeredSection: "text-center py-10",
  gridLayout: "grid grid-cols-1 md:grid-cols-2 gap-4",
  // Additions
  flexWrap: "flex flex-wrap",
  columnCenter: "flex flex-col items-center justify-center",
  rowCenter: "flex flex-row items-center justify-center",
};

// Common button styles
export const buttonStyles = {
  primary:
    "w-full py-3 text-xl font-bold text-white transition-transform duration-300 bg-green-400 rounded-lg shadow-lg hover:bg-green-500 hover:scale-105",
  secondary:
    "w-full py-3 text-xl font-bold text-white transition-transform duration-300 bg-blue-400 rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105",
  logout:
    "w-full py-3 mt-8 text-xl font-bold text-white transition-transform duration-300 bg-red-400 rounded-lg shadow-lg mb-14 hover:bg-red-500 hover:scale-105",
  achievementsButton:
    "w-full py-3 text-xl font-bold text-white transition-transform duration-300 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105",
  smallButton:
    "px-4 py-2 text-sm font-bold text-white transition-transform duration-300 bg-gray-600 rounded-md shadow-md hover:bg-gray-700",
  // Additions
  iconButton: "p-2 rounded-full text-white hover:bg-gray-600 transition",
  linkButton: "text-blue-400 hover:text-blue-600 underline",
};

// Common typography styles
export const typographyStyles = {
  heading1: "text-4xl font-bold text-gray-100 mb-6",
  heading2: "text-3xl font-semibold text-gray-100 mb-4",
  heading3: "text-2xl font-semibold text-gray-300 mb-4",
  heading4: "text-2xl font-semibold text-gray-300 mb-4 text-green-400",
  paragraph: "text-base text-gray-400",
  link: "text-blue-400 hover:text-blue-600 underline",
  highlightText: "text-yellow-300 font-semibold",
  // Additions
  subheading: "text-lg font-medium text-gray-400",
  caption: "text-sm text-gray-500",
};

// Common spacing and utility styles
export const spacingStyles = {
  marginAuto: "mx-auto",
  marginBottomLarge: "mb-10",
  paddingHorizontal: "px-4 md:px-8",
  paddingVertical: "py-4 md:py-6",
  roundedLg: "rounded-lg",
  shadowLg: "shadow-lg",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  // Additions
  marginTopMedium: "mt-6",
  marginBottomSmall: "mb-4",
  paddingSmall: "p-2",
};

// Profile-specific styles
export const profileStyles = {
  pictureContainer: "w-24 h-24 mb-4",
  picture:
    "object-cover w-full h-full border-4 border-blue-500 rounded-full shadow-lg",
  username: "ml-6 text-4xl font-bold text-gray-100",
  sectionTitle: "mb-4 text-2xl font-semibold text-green-400",
  bioText: "text-lg text-gray-400",
  // Additions
  profileDescription: "text-center text-gray-300 mt-2",
  profileActions: "flex items-center justify-between mt-6",
};

// Form-specific styles
export const formStyles = {
  formGroup: "flex flex-col md:flex-row md:gap-6",
  label: "block text-lg font-medium text-gray-400",
  input:
    "block w-full p-2 mt-1 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500",
  errorText: "text-sm text-red-500 mt-2",
  submitButton:
    "w-full py-3 text-lg font-bold text-white transition-transform duration-300 bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 ",
  // Additions
  disabledInput: "bg-gray-200 text-gray-500 cursor-not-allowed",
  fullWidthInput: "w-full",
};

// Achievements-specific styles
export const achievementsStyles = {
  title: "mb-6 text-3xl font-bold text-center",
  progressCircle: "relative bg-gray-300 rounded-full w-36 h-36",
  levelTrophy: "text-4xl text-yellow-500", // Trophy icon
  levelMedal: "text-4xl text-gray-400", // Medal icon
  levelStar: "text-4xl text-yellow-800", // Star icon
  // Additions
  progressBar: "w-full h-4 bg-gray-200 rounded-lg",
  progressText: "text-lg font-semibold text-gray-300 text-center",
};
