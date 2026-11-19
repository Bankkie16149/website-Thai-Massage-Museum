import React from 'react';

export default function QuizGameView({
  locale,
  t,
  quiz,
  qIndex,
  choice,
  answered,
  score,
  onBackToGames,
  onSwitchToThai,
  onStartQuizQuestions,
  onSelectChoice,
  onCheckAnswer,
  onNextQuizQuestion,
  onOpenRelatedTopic,
}) {
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';

  const renderShellContent = () => {
    if (locale !== 'th') {
      return (
        <>
          <div className="text-[#866d48] text-[0.75rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]">
            THAI ORIGINAL QUIZ
          </div>
          <h3 className="text-[1.43rem] leading-[1.48] mt-3 mb-5 font-bold">{t.quizUnavailable}</h3>
          <p>{t.quizUnavailableDetail}</p>
          <button
            type="button"
            onClick={onSwitchToThai}
            className="mt-[15px] border border-[#879a80] bg-transparent hover:bg-[#eef3ea] text-[#2a513c] rounded-[12px] py-[9px] px-[17px] font-extrabold min-h-[45px]"
          >
            {t.changeThai}
          </button>
        </>
      );
    }

    if (qIndex < 0) {
      return (
        <>
          <div className="text-[#866d48] text-[0.75rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]">
            ORIGINAL QUIZ / DRAFT
          </div>
          <h3 className="text-[1.43rem] leading-[1.48] mt-3 mb-5 font-bold">
            4 คำถามจากเนื้อหาพิพิธภัณฑ์
          </h3>
          <p>คำถามชุดเดิมคงไว้ครบทั้ง 4 ข้อ และใช้คำเฉลยจากไฟล์ไทย</p>
          <button
            type="button"
            onClick={onStartQuizQuestions}
            className="mt-6 min-h-[61px] rounded-[18px] py-[11px] px-[25px] text-[0.96rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#295944] hover:bg-[#204837] text-white"
          >
            เริ่มเล่นเกมทดลอง →
          </button>
        </>
      );
    }

    if (qIndex >= quiz.questions.length) {
      return (
        <>
          <div className="text-[#866d48] text-[0.75rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]">
            QUIZ COMPLETE
          </div>
          <h3 className="text-[1.43rem] leading-[1.48] mt-3 mb-5 font-bold">{t.result}</h3>
          <div className="text-[4.5rem] leading-[1.2] text-[#27563d] font-black mt-[13px] mb-5">
            {score} / {quiz.questions.length}
          </div>
          <p>คำถามและเฉลยอิงข้อความจากไฟล์ไทย · ฉบับร่าง</p>
          <button
            type="button"
            onClick={onStartQuizQuestions}
            className="mt-[22px] min-h-[61px] rounded-[18px] py-[11px] px-[25px] text-[0.96rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#295944] hover:bg-[#204837] text-white"
          >
            {t.retry} ↻
          </button>
        </>
      );
    }

    const q = quiz.questions[qIndex];
    const progressValue = qIndex + (answered ? 1 : 0);
    const matched = q.choices.find((ch) => ch.id === q.correctChoiceId);
    const isCorrect = choice === q.correctChoiceId;

    return (
      <>
        <div className="text-[#866d48] text-[0.75rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]">
          {t.number} {qIndex + 1} / {quiz.questions.length}
        </div>

        <div
          className="h-2 bg-[#e8e6d9] rounded-full overflow-hidden mt-[15px] mb-6"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={quiz.questions.length}
          aria-valuenow={progressValue}
        >
          <div
            className="h-full bg-[#47745c] transition-[width] duration-200"
            style={{ width: `${(progressValue / quiz.questions.length) * 100}%` }}
          />
        </div>

        <h3 id="active-question" className="text-[1.43rem] leading-[1.48] mt-3 mb-5 font-bold">
          {q.question}
        </h3>

        <fieldset className="border-0 p-0 m-0 grid gap-[10px]">
          <legend className="sr-only">เลือกคำตอบหนึ่งข้อ</legend>
          {q.choices.map((a) => (
            <label
              key={a.id}
              className="answer-option flex gap-[13px] items-center py-[14px] px-4 border border-[#bbc7b9] rounded-[14px] cursor-pointer bg-white"
            >
              <input
                type="radio"
                name="quiz-answer"
                value={a.id}
                checked={choice === a.id}
                disabled={answered}
                onChange={() => onSelectChoice(a.id)}
                className="w-[18px] h-[18px] accent-[#325940] flex-none"
              />
              <span>{a.text}</span>
            </label>
          ))}
        </fieldset>

        {answered && (
          <div
            role="status"
            className={`p-4 rounded-[14px] mt-4 grid gap-[6px] ${
              isCorrect ? 'bg-[#e4f0df] text-[#264c35]' : 'bg-[#fbe8d9] text-[#77462c]'
            }`}
          >
            <strong>
              {isCorrect ? t.right : t.wrong} · {t.correctAnswer} {matched?.text}
            </strong>
            <span className="text-[0.92rem]">{q.explanation}</span>
            <small className="text-[0.76rem]">
              {t.sourceRef} {q.sourceParagraphIndex + 1}
            </small>
          </div>
        )}

        <div className="flex gap-[10px] flex-wrap mt-[22px]">
          {!answered ? (
            <button
              type="button"
              disabled={!choice}
              onClick={onCheckAnswer}
              className="min-h-[61px] rounded-[18px] py-[11px] px-[25px] text-[0.96rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#295944] hover:bg-[#204837] text-white"
            >
              {t.check}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onNextQuizQuestion}
                className="min-h-[61px] rounded-[18px] py-[11px] px-[25px] text-[0.96rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#295944] hover:bg-[#204837] text-white"
              >
                {qIndex === quiz.questions.length - 1 ? 'ดูผลคะแนน →' : `${t.next} →`}
              </button>
              <button
                type="button"
                onClick={() => onOpenRelatedTopic(q.relatedTopicKey)}
                className="min-h-[61px] rounded-[18px] py-[11px] px-[25px] text-[0.96rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-transparent hover:bg-[#e5ebdf] text-[#315544] border border-[#738e78]"
              >
                อ่านเรื่องที่เกี่ยวข้อง ↗
              </button>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <section
      id="view-quiz"
      className="pt-[35px] max-[650px]:pt-[10px]"
      aria-labelledby="quiz-view-title"
    >
      <button
        type="button"
        onClick={onBackToGames}
        className="border border-[#ffffff6a] bg-transparent hover:bg-[#ffffff13] text-[var(--cream)] rounded-[14px] py-[9px] px-[16px] min-h-[45px] font-extrabold mb-6"
      >
        ← <span lang={copyLang}>{t.allGames}</span>
      </button>

      <div className="grid grid-cols-[minmax(270px,0.77fr)_minmax(420px,1.23fr)] max-[1130px]:grid-cols-[1fr_1.28fr] max-[760px]:grid-cols-1 gap-[clamp(35px,6vw,90px)] max-[1130px]:gap-5 items-start">
        <div>
          <div className="overline">ORIGINAL MINI QUIZ / 02</div>
          <h2 id="quiz-view-title" className="mt-[17px] mb-[22px] max-[760px]:text-[2.35rem] font-bold" lang={copyLang}>
            {t.quizTitle}
          </h2>
          <p className="text-[#d4e0d5] text-[1rem]" lang={copyLang}>
            {t.quizSide}
          </p>
          <div className="flex flex-wrap gap-[11px] mt-7">
            <span className="inline-flex gap-[9px] items-center py-[9px] px-[14px] border border-[var(--stroke)] rounded-[40px] text-[#e6dfce] text-[0.74rem] font-bold bg-[#ffffff07]">
              <span lang={copyLang}>{t.fourQuestions}</span>
            </span>
            <span className="inline-flex gap-[9px] items-center py-[9px] px-[14px] border border-[var(--stroke)] rounded-[40px] text-[#e6dfce] text-[0.74rem] font-bold bg-[#ffffff07]">
              ✣ <span lang={copyLang}>{t.sourceGame}</span>
            </span>
          </div>
        </div>

        <div
          id="quiz-content"
          className="bg-[#fffaf1] text-[#233e31] rounded-[28px] shadow-museum p-[clamp(20px,3.7vw,42px)] max-[760px]:p-[22px] max-[410px]:p-[17px] min-h-[420px] max-[760px]:min-h-0"
        >
          {renderShellContent()}
        </div>
      </div>
    </section>
  );
}
