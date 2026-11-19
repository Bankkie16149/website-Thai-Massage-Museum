import React from 'react';

export default function BottomRail({ mode, locale, t, onNavigate, onOpenExhibit }) {
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';
  const isExplore = mode === 'front' || mode === 'answer';
  const isGames = mode === 'games' || mode === 'timeline' || mode === 'quiz';

  return (
    <>
      <nav
        className="flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] mx-auto mt-[25px] max-[650px]:mt-[22px] bg-[#e9debf12] border border-[#dbc5934a] rounded-[23px] backdrop-blur-[8px] py-[8px] px-[10px] max-[650px]:p-[5px] max-w-[700px] max-[650px]:max-w-full max-[650px]:sticky max-[650px]:bottom-[10px] max-[650px]:z-[4] max-[650px]:shadow-[0_10px_24px_#001a19a8]"
        aria-label="Experience modes"
      >
        <button
          type="button"
          id="nav-front"
          aria-current={isExplore ? 'page' : 'false'}
          onClick={() => onNavigate('front')}
          className={`min-h-[59px] max-[650px]:min-h-[52px] border-0 flex-1 rounded-[17px] text-[0.9rem] max-[760px]:text-[0.79rem] max-[650px]:text-[0.71rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[7px] py-[11px] max-[650px]:py-[8px] ${
            isExplore
              ? 'bg-[#f8ecd1] text-[#19372e]'
              : 'bg-transparent text-[#e8eee5] hover:bg-[#ffffff1e]'
          }`}
        >
          ◈ <span lang={copyLang}>{t.discover}</span>
        </button>

        <button
          type="button"
          id="nav-games"
          aria-current={isGames ? 'page' : 'false'}
          onClick={() => onNavigate('games')}
          className={`min-h-[59px] max-[650px]:min-h-[52px] border-0 flex-1 rounded-[17px] text-[0.9rem] max-[760px]:text-[0.79rem] max-[650px]:text-[0.71rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[7px] py-[11px] max-[650px]:py-[8px] ${
            isGames
              ? 'bg-[#f8ecd1] text-[#19372e]'
              : 'bg-transparent text-[#e8eee5] hover:bg-[#ffffff1e]'
          }`}
        >
          ✣ <span lang={copyLang}>{t.games}</span>{' '}
          <span className="text-[0.64rem] max-[650px]:text-[0.54rem] font-black border border-current rounded-[15px] px-[5px]">
            2
          </span>
        </button>

        <button
          type="button"
          id="nav-source"
          onClick={onOpenExhibit}
          className="min-h-[59px] max-[650px]:min-h-[52px] border-0 flex-1 rounded-[17px] text-[0.9rem] max-[760px]:text-[0.79rem] max-[650px]:text-[0.71rem] font-extrabold inline-flex items-center justify-center gap-[9px] max-[650px]:gap-[5px] px-[clamp(14px,2vw,29px)] max-[650px]:px-[7px] py-[11px] max-[650px]:py-[8px] bg-transparent text-[#e8eee5] hover:bg-[#ffffff1e]"
        >
          ◎ <span lang={copyLang}>{t.learnMore}</span>
        </button>
      </nav>

      <p
        className="text-[#8fa9a1] text-[0.6rem] max-[650px]:text-[0.53rem] text-center pt-[17px] max-[650px]:pb-2"
        id="small-footer"
      >
        PRIVATE HTML EXPERIENCE · CONTENT FROM PROVIDED DOCUMENTS · AUDIO DEFERRED · LINE OA PENDING
      </p>
    </>
  );
}
