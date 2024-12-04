import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import React, { useCallback, useMemo, useState } from 'react';

export const Default = (): JSX.Element => {
  const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const availableLanguages = useMemo(
    () => [
      { code: 'en', label: 'English' },
      { code: 'fr-CA', label: 'Français' },
      { code: 'ja-JP', label: '日本語' },
    ],
    []
  );

  const changeLanguage = (langCode: string) => {
    sitecoreContext.language = langCode;
    updateSitecoreContext(sitecoreContext);
    window.location.replace("/" + langCode);
  };

  return (
    <div
      className={`language-switcher ${showLanguageDropdown ? 'expanded' : ''}`}
      onClick={() => { return setShowLanguageDropdown(!showLanguageDropdown)}}
    >
      <span className="selected-language">
        {availableLanguages.find((lang) => lang.code === sitecoreContext.language)?.label}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="chevron-icon"
        viewBox="0 0 512 512"
        width={16}
        fill="currentColor"
      >
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
      {showLanguageDropdown && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <span key={lang.code} onClick={() => changeLanguage(lang.code)}>
              {lang.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Default;