import React from 'react';

export default function FallbackBanner({ locale }) {
  if (locale === 'th' || locale === 'en') {
    return null;
  }

  return (
    <div
      className="bg-[#ffe9af] text-[#5f4315] text-center py-[6px] px-[15px] text-[0.77rem] font-bold"
      id="interface-fallback"
      role="note"
      lang="en"
    >
      Museum explanations are from your selected-language file. Interaction labels use English for now.
    </div>
  );
}
