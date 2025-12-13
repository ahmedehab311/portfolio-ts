export interface TSkillsHeroColors {
    // backgrounds
    bgGradient: string;

    // texts
    textPrimary: string;
    textSecondary: string;
    textAccent: string;

    // transparent backgrounds
    cardBg: string;
    codeBg: string;

    // gradients
    buttonGradient: string;

    // borders
    borderColor: string;
    borderLight: string;

    // badges & icons
    badgeBg: string;
    badgeText: string;

    // shadows
    shadow: string;

    // cursor effect
    cursorEffect: string;
}

export interface TSkillsHero {
    colors: TSkillsHeroColors;
    isDark: boolean;
}