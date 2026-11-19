import React from 'react';
import { triggerRipple } from '../utils/ripple';

export default function BottomRail({ mode, locale, t, onNavigate, onOpenExhibit }) {
  const isExplore = mode === 'front' || mode === 'answer';
  const isGames = mode === 'games' || mode === 'timeline' || mode === 'quiz';

  return (
    <div className="pb-[env(safe-area-inset-bottom,0px)] select-none">
      <nav
        className="flex flex-wrap items-center justify-center gap-[9px] max-[650px]:gap-[6px] mx-auto mt-[28px] max-[650px]:mt-[22px] bg-[#170508b3] border border-[#e6c17745] rounded-[24px] backdrop-blur-[10px] py-[9px] px-[10px] max-[650px]:p-[6px] max-w-[740px] max-[650px]:max-w-full max-[650px]:sticky max-[650px]:bottom-[10px] max-[650px]:z-[4] max-[650px]:shadow-[0_12px_28px_#0d0204c7]"
        aria-label={t.discover}
      >
        <button
          type="button"
          id="nav-front"
          aria-current={isExplore ? 'page' : 'false'}
          onPointerDown={triggerRipple}
          onClick={() => onNavigate('front')}
          className={`relative overflow-hidden min-h-[60px] max-[650px]:min-h-[56px] border-0 flex-1 rounded-[18px] text-[0.95rem] max-[760px]:text-[0.82rem] max-[650px]:text-[0.74rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[8px] py-[11px] max-[650px]:py-[8px] active:scale-[0.96] transition-[transform,background-color,color] duration-200 ${
            isExplore
              ? 'bg-[#f7ebd4] text-[#2d1014]'
              : 'bg-transparent text-[#f3e7e2] hover:bg-[#ffffff1a]'
          }`}
        >
          ◈ <span lang={locale}>{t.discover}</span>
        </button>

        <button
          type="button"
          id="nav-games"
          aria-current={isGames ? 'page' : 'false'}
          onPointerDown={triggerRipple}
          onClick={() => onNavigate('games')}
          className={`relative overflow-hidden min-h-[60px] max-[650px]:min-h-[56px] border-0 flex-1 rounded-[18px] text-[0.95rem] max-[760px]:text-[0.82rem] max-[650px]:text-[0.74rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[8px] py-[11px] max-[650px]:py-[8px] active:scale-[0.96] transition-[transform,background-color,color] duration-200 ${
            isGames
              ? 'bg-[#f7ebd4] text-[#2d1014]'
              : 'bg-transparent text-[#f3e7e2] hover:bg-[#ffffff1a]'
          }`}
        >
          ✣ <span lang={locale}>{t.games}</span>{' '}
          <span className="text-[0.68rem] max-[650px]:text-[0.58rem] font-black border border-current rounded-[15px] px-[6px]">
            2
          </span>
        </button>

        <button
          type="button"
          id="nav-source"
          onPointerDown={triggerRipple}
          onClick={onOpenExhibit}
          className="relative overflow-hidden min-h-[60px] max-[650px]:min-h-[56px] border-0 flex-1 rounded-[18px] text-[0.95rem] max-[760px]:text-[0.82rem] max-[650px]:text-[0.74rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[8px] py-[11px] max-[650px]:py-[8px] bg-transparent text-[#f3e7e2] hover:bg-[#ffffff1a] active:scale-[0.96] transition-[transform,background-color] duration-200"
        >
          ◎ <span lang={locale}>{t.learnMore}</span>
        </button>
      </nav>

      <p
        className="text-[#c5a89f] text-[0.66rem] max-[650px]:text-[0.58rem] text-center pt-[16px] max-[650px]:pb-2"
        id="small-footer"
        lang={locale}
      >
        {t.footerNote}
      </p>
    </div>
  );
}
