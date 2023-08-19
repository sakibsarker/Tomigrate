import { createSlice } from '@reduxjs/toolkit';
import { THEME_APPEARANCE } from '../common/constants/app.constants';

const APPEARANCE = 'appearance';
const getThemeAppearance = () => {
    const savedThemeAppearance = localStorage.getItem(APPEARANCE);
    const userPrefersDark = window.matchMedia(
        `(prefers-color-scheme: ${THEME_APPEARANCE.DARK_MODE})`
    ).matches;

    return savedThemeAppearance
        ? savedThemeAppearance
        : userPrefersDark
        ? THEME_APPEARANCE.DARK_MODE
        : THEME_APPEARANCE.LIGHT_MODE;
};

const initialState = {
    themeAppearance: getThemeAppearance()
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeAppearance(state, action) {
            localStorage.setItem(APPEARANCE, action.payload);
            state.themeAppearance = action.payload;
        }
    }
});

export const { setThemeAppearance } = themeSlice.actions;
export default themeSlice.reducer;
