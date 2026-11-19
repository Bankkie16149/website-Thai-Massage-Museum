import React from 'react';
import { LANGUAGES } from '../data/copyData';

export default function TopHeader({
  locale,
  brandTitle,
  t,
  onSelectLocale,
  onOpenLanguageDialog,
  onGoHome,
}) {
  const selected = LANGUAGES.find(([code]) => code === locale) || LANGUAGES[0];
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';

  return (
    <>
      <a href="#experience" className="sr-only" id="skip">
        {locale === 'th' ? 'ข้ามไปยังหน้าจอสำรวจ' : 'Skip to interactive experience'}
      </a>

      <header className="bg-[#0b2425] text-[#f1ead7] border-b border-[#e7cd9830] relative z-[4]">
        <div className="w-[min(1570px,calc(100%-56px))] max-[1100px]:w-[calc(100%-34px)] max-[650px]:w-[calc(100%-22px)] mx-auto flex items-center gap-[22px] max-[650px]:gap-[8px] min-h-[76px] max-[650px]:min-h-[67px]">
          <div className="flex items-center gap-[13px] max-[650px]:gap-[9px] min-w-0" aria-label="Thai Massage Museum experience">
            <span
              className="grid place-items-center w-[49px] h-[49px] max-[650px]:w-[38px] max-[650px]:h-[38px] flex-none border-[1.4px] border-[#e7c58d] text-[#e7c58d] rotate-45 rounded-[10px] font-serif text-[24px] max-[650px]:text-[19px]"
              aria-hidden="true"
            >
              ❖
            </span>
            <div>
              <strong
                id="brand-source"
                className="text-[1rem] max-[650px]:text-[0.75rem] max-[360px]:text-[0.68rem] leading-[1.32] block whitespace-nowrap overflow-hidden text-ellipsis max-w-[28ch] max-[650px]:max-w-[100px] max-[360px]:max-w-[73px] text-[#f8f2e5]"
              >
                {brandTitle}
              </strong>
              <small className="text-[0.65rem] max-[650px]:text-[0.49rem] tracking-[0.17em] max-[650px]:tracking-[0.05em] font-extrabold block text-[#c6a972]">
                THE DISCOVERY ROOM · LOCAL
              </small>
            </div>
          </div>

          <div className="flex-1" />

          <div className="inline-flex gap-[9px] items-center text-[0.72rem] tracking-[0.14em] font-black text-[#cfdbce] whitespace-nowrap max-[1100px]:hidden">
            <i className="w-2 h-2 rounded-full bg-[#c79a4d] shadow-[0_0_0_4px_#c79a4d33]" aria-hidden="true" />
            TOUCH • DISCOVER • PLAY
          </div>

          <div className="flex gap-2 items-center max-[650px]:ml-auto">
            <label htmlFor="locale-select" className="sr-only" id="lang-label">
              {locale === 'th' ? 'ภาษา' : 'Language'}
            </label>
            <select
              id="locale-select"
              className="sr-only"
              aria-label="Select document language"
              value={locale}
              onChange={(e) => onSelectLocale(e.target.value)}
            >
              {LANGUAGES.map(([code, , name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              type="button"
              id="language-trigger"
              onClick={onOpenLanguageDialog}
              aria-haspopup="dialog"
              aria-controls="language-dialog"
              aria-label={`Choose language, current ${selected[3]}`}
              className="min-h-[64px] max-[650px]:min-h-[55px] rounded-[20px] max-[650px]:rounded-[13px] py-[9px] px-[16px] max-[650px]:py-[6px] max-[650px]:px-[8px] bg-[#f7ebd1] hover:bg-[#fff6e3] border-2 border-[#e4c37d] text-[#13352e] flex gap-[12px] max-[650px]:gap-[7px] items-center shadow-[inset_0_0_0_3px_#fff9e3]"
            >
              <span
                className="text-[1.9rem] max-[650px]:text-[1.3rem] font-serif border-r border-[#bbb09d] pr-[12px] max-[650px]:pr-[6px]"
                aria-hidden="true"
              >
                文
              </span>
              <span className="text-left flex flex-col leading-[1.3] min-w-[105px] max-[650px]:min-w-[59px]">
                <small className="text-[0.59rem] tracking-[0.09em] text-[#436b53] font-extrabold max-[650px]:hidden">
                  LANGUAGE / भाषा / 语言
                </small>
                <strong
                  id="current-language"
                  className="text-[1.16rem] max-[650px]:text-[0.86rem] max-[650px]:max-w-[88px] max-[360px]:max-w-[72px] max-[650px]:overflow-hidden max-[650px]:text-ellipsis whitespace-nowrap"
                >
                  {selected[2]}
                </strong>
              </span>
              <span aria-hidden="true" className="text-[1.45rem] max-[650px]:text-[1.04rem]">
                ⌄
              </span>
            </button>
          </div>

          <button
            type="button"
            id="restart"
            onClick={onGoHome}
            className="min-h-[60px] max-[650px]:min-h-[51px] bg-[#274a44] hover:bg-[#426759] text-[#fdf6e6] border border-[#7b947b] rounded-[18px] max-[650px]:rounded-[13px] py-[11px] px-[21px] max-[650px]:py-[7px] max-[650px]:px-[10px] max-[650px]:text-[0.72rem] font-extrabold"
          >
            ⌂ <span lang={copyLang}>{t.home}</span>
          </button>
        </div>
      </header>
    </>
  );
}
