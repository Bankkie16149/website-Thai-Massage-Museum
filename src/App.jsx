import React, { useCallback, useEffect, useRef, useState } from 'react';
import sourceData from './data/sourceData.json';
import quizData from './data/quizData.json';
import timelineGameData from './data/timelineGameData.json';
import imagesData from './data/imagesData.json';
import { COPY } from './data/copyData';
import { navigateWithTransition } from './utils/viewTransition';
import AttractScreen from './components/AttractScreen';
import IdleWarningDialog from './components/IdleWarningDialog';
import TopHeader from './components/TopHeader';
import LanguageDialog from './components/LanguageDialog';
import LanguageStage from './components/LanguageStage';
import BottomRail from './components/BottomRail';
import FrontView from './components/views/FrontView';
import AnswerView from './components/views/AnswerView';
import GamesMenuView from './components/views/GamesMenuView';
import TimelineGameView from './components/views/TimelineGameView';
import QuizGameView from './components/views/QuizGameView';

const groups = sourceData.technicalReadingGroups;
const timelineItemCount = timelineGameData.locales.th.items.length;
const IDLE_WARNING_DELAY_MS = 75_000;
const IDLE_COUNTDOWN_SECONDS = 15;
const VIEW_DEPTH = { front: 1, games: 1, answer: 2, timeline: 2, quiz: 2 };

function createShuffledOrder(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.every((v, idx) => v === idx) && arr.length > 1) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export default function App() {
  const [attractActive, setAttractActive] = useState(true);
  const [locale, setLocale] = useState('th');
  const [mode, setMode] = useState('front');
  const [topic, setTopic] = useState(0);
  const [visited, setVisited] = useState(() => new Set());
  const [expandedTopics, setExpandedTopics] = useState(() => new Set());
  const [fontScale, setFontScale] = useState('normal'); // 'normal' | 'large'
  const [languageChosen, setLanguageChosen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

  // Kiosk Idle Timer state
  const [idleWarningOpen, setIdleWarningOpen] = useState(false);
  const [idleSecondsLeft, setIdleSecondsLeft] = useState(IDLE_COUNTDOWN_SECONDS);
  const [activityTick, setActivityTick] = useState(0);

  // Timeline game state
  const [stamps, setStamps] = useState([]);
  const [misses, setMisses] = useState(0);
  const [timelineScore, setTimelineScore] = useState(0);
  const [timelineOrder, setTimelineOrder] = useState(() => createShuffledOrder(timelineItemCount));
  const [timelineStatus, setTimelineStatus] = useState('ready'); // 'ready' | 'good' | 'wrong' | 'win'

  // Quiz game state
  const [qIndex, setQIndex] = useState(-1);
  const [choice, setChoice] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const frontHeadRef = useRef(null);
  const answerTitleRef = useRef(null);

  const source = sourceData.locales[locale] || sourceData.locales.th;
  const paras = source.paragraphs;
  const t = COPY[locale] || COPY.en;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${source.title} · Interactive Museum Explorer`;
  }, [locale, source.title]);

  useEffect(() => {
    document.body.dataset.mode = attractActive ? 'attract' : mode;
  }, [attractActive, mode]);

  useEffect(() => {
    document.body.classList.toggle('language-chosen', languageChosen);
  }, [languageChosen]);

  const resetKioskSession = useCallback((returnToAttract = true) => {
    navigateWithTransition(() => {
      setLocale('th');
      setMode('front');
      setTopic(0);
      setVisited(new Set());
      setExpandedTopics(new Set());
      setFontScale('normal');
      setLanguageChosen(false);
      setLanguageDialogOpen(false);
      setIdleWarningOpen(false);
      setIdleSecondsLeft(IDLE_COUNTDOWN_SECONDS);
      setStamps([]);
      setMisses(0);
      setTimelineScore(0);
      setTimelineOrder(createShuffledOrder(timelineItemCount));
      setTimelineStatus('ready');
      setQIndex(-1);
      setChoice(null);
      setAnswered(false);
      setScore(0);
      setAttractActive(returnToAttract);
    }, 'backward');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Track user interaction when inside active kiosk session
  useEffect(() => {
    if (attractActive || idleWarningOpen) return;

    const bumpActivity = () => setActivityTick((n) => n + 1);
    const events = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
    events.forEach((ev) => window.addEventListener(ev, bumpActivity, { passive: true }));

    const timer = window.setTimeout(() => {
      setIdleSecondsLeft(IDLE_COUNTDOWN_SECONDS);
      setIdleWarningOpen(true);
    }, IDLE_WARNING_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, bumpActivity));
    };
  }, [attractActive, idleWarningOpen, activityTick]);

  // Countdown during idle warning modal
  useEffect(() => {
    if (!idleWarningOpen) return;

    const interval = window.setInterval(() => {
      setIdleSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          resetKioskSession(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [idleWarningOpen, resetKioskSession]);

  const showView = useCallback(
    (nextMode, scroll = true, explicitDirection) => {
      const currentDepth = VIEW_DEPTH[mode] ?? 1;
      const nextDepth = VIEW_DEPTH[nextMode] ?? 1;
      const direction =
        explicitDirection ||
        (nextDepth > currentDepth ? 'forward' : nextDepth < currentDepth ? 'backward' : 'switch');

      navigateWithTransition(() => {
        setMode(nextMode);
      }, direction);

      if (scroll) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    },
    [mode]
  );

  const openTopic = useCallback(
    (i, direction) => {
      const targetDirection = direction || (mode === 'answer' ? 'switch' : 'forward');
      navigateWithTransition(() => {
        setTopic(i);
        setVisited((prev) => {
          const next = new Set(prev);
          next.add(i);
          return next;
        });
        setMode('answer');
      }, targetDirection);
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => {
        answerTitleRef.current?.focus({ preventScroll: true });
      });
    },
    [mode]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (attractActive || idleWarningOpen) return;
      if (document.activeElement?.matches('input,select,textarea') || languageDialogOpen) return;
      if (mode === 'front' && /^[1-6]$/.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        openTopic(Number(e.key) - 1, 'forward');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [attractActive, idleWarningOpen, mode, languageDialogOpen, openTopic]);

  const resetTimeline = useCallback(() => {
    setStamps([]);
    setMisses(0);
    setTimelineScore(0);
    setTimelineOrder(createShuffledOrder(timelineItemCount));
    setTimelineStatus('ready');
  }, []);

  const handleSelectLocale = useCallback(
    (newLocale, { fromInteractiveTile = false } = {}) => {
      if (!sourceData.locales[newLocale]) return;
      navigateWithTransition(() => {
        if (fromInteractiveTile) {
          setLanguageChosen(true);
        }
        setLocale(newLocale);
        setLanguageDialogOpen(false);
      }, 'switch');

      if (fromInteractiveTile && mode === 'front' && window.matchMedia('(max-width:650px)').matches) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          frontHeadRef.current?.focus({ preventScroll: true });
        });
      }
    },
    [mode]
  );

  const handleStartFromAttract = (selectedCode = locale) => {
    navigateWithTransition(() => {
      if (sourceData.locales[selectedCode]) {
        setLocale(selectedCode);
        setLanguageChosen(true);
      }
      setAttractActive(false);
      setMode('front');
      setActivityTick((n) => n + 1);
    }, 'forward');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSurprise = () => {
    const nextIdx = groups.findIndex((_, i) => !visited.has(i));
    openTopic(nextIdx >= 0 ? nextIdx : 0, 'forward');
  };

  const handleToggleExpand = () => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const handleNextQuestion = () => {
    openTopic((topic + 1) % groups.length, 'switch');
  };

  const handleStartTimeline = () => {
    navigateWithTransition(() => {
      resetTimeline();
      setMode('timeline');
    }, 'forward');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectTimelineCard = (k) => {
    const { pointsPerCorrect, penaltyPerMistake, minScore } = timelineGameData.scoring;
    const wanted = stamps.length;
    if (k !== wanted) {
      setMisses((m) => m + 1);
      setTimelineScore((prev) => Math.max(minScore, prev - penaltyPerMistake));
      setTimelineStatus('wrong');
      return;
    }
    const nextStamps = [...stamps, k];
    setStamps(nextStamps);
    setTimelineScore((prev) => prev + pointsPerCorrect);
    setTimelineStatus(nextStamps.length === timelineItemCount ? 'win' : 'good');
  };

  const timelineFeedbackText =
    timelineStatus === 'win'
      ? t.timelineWin
      : timelineStatus === 'wrong'
        ? t.timelineWrong
        : timelineStatus === 'good'
          ? t.timelineGood
          : t.timelineReady;

  const handleStartQuiz = () => {
    navigateWithTransition(() => {
      setQIndex(-1);
      setChoice(null);
      setAnswered(false);
      setScore(0);
      setMode('quiz');
    }, 'forward');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleStartQuizQuestions = () => {
    setQIndex(0);
    setScore(0);
    setChoice(null);
    setAnswered(false);
  };

  const handleCheckQuizAnswer = () => {
    if (!choice) return;
    const localizedQuiz = quizData.locales[locale] || quizData.locales.en;
    setAnswered(true);
    if (choice === localizedQuiz.questions[qIndex].correctChoiceId) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setQIndex((idx) => idx + 1);
    setChoice(null);
    setAnswered(false);
  };

  const handleOpenRelatedTopic = (topicKey) => {
    const idx = groups.findIndex((g) => g.key === topicKey);
    if (idx >= 0) openTopic(idx, 'forward');
  };

  if (attractActive) {
    return (
      <AttractScreen
        locale={locale}
        t={t}
        brandTitle={paras[0]}
        heroPhoto={imagesData['6'].large}
        secondaryPhoto={imagesData['2'].large}
        onStart={() => handleStartFromAttract(locale)}
        onSelectLanguageAndStart={(code) => handleStartFromAttract(code)}
      />
    );
  }

  return (
    <>
      <TopHeader
        locale={locale}
        brandTitle={paras[0]}
        t={t}
        onSelectLocale={(code) => handleSelectLocale(code, { fromInteractiveTile: false })}
        onOpenLanguageDialog={() => setLanguageDialogOpen(true)}
        onGoHome={() => showView('front', true, mode === 'front' ? 'switch' : 'backward')}
        onResetSession={() => resetKioskSession(true)}
      />

      <LanguageDialog
        isOpen={languageDialogOpen}
        locale={locale}
        t={t}
        onSelectLanguage={(code) => handleSelectLocale(code, { fromInteractiveTile: true })}
        onClose={() => setLanguageDialogOpen(false)}
      />

      <IdleWarningDialog
        isOpen={idleWarningOpen}
        secondsLeft={idleSecondsLeft}
        locale={locale}
        t={t}
        onContinue={() => {
          setIdleWarningOpen(false);
          setActivityTick((n) => n + 1);
        }}
        onResetNow={() => resetKioskSession(true)}
      />

      <main className="screen" id="experience">
        <div className="max-w-[1560px] px-[34px] pb-[42px] max-[1100px]:px-[22px] max-[1100px]:pb-[30px] max-[650px]:px-3 max-[650px]:pb-[22px] min-[1500px]:px-[45px] mx-auto">
          {mode === 'front' && (
            <LanguageStage
              locale={locale}
              t={t}
              onSelectLanguage={(code) => handleSelectLocale(code, { fromInteractiveTile: true })}
            />
          )}

          {mode === 'front' && (
            <FrontView
              locale={locale}
              t={t}
              paras={paras}
              groups={groups}
              media={imagesData}
              visited={visited}
              frontHeadRef={frontHeadRef}
              onSurprise={handleSurprise}
              onGoGames={() => showView('games', true, 'forward')}
              onOpenTopic={(i) => openTopic(i, 'forward')}
            />
          )}

          {mode === 'answer' && (
            <AnswerView
              locale={locale}
              t={t}
              source={source}
              paras={paras}
              groups={groups}
              topic={topic}
              media={imagesData}
              visited={visited}
              isExpanded={expandedTopics.has(topic)}
              fontScale={fontScale}
              answerTitleRef={answerTitleRef}
              onBack={() => showView('front', true, 'backward')}
              onToggleExpand={handleToggleExpand}
              onToggleFontScale={setFontScale}
              onNextQuestion={handleNextQuestion}
              onGoGames={() => showView('games', true, 'forward')}
            />
          )}

          {mode === 'games' && (
            <GamesMenuView
              locale={locale}
              t={t}
              onSelectTimeline={handleStartTimeline}
              onSelectQuiz={handleStartQuiz}
            />
          )}

          {mode === 'timeline' && (
            <TimelineGameView
              locale={locale}
              t={t}
              timelineData={timelineGameData}
              positions={timelineOrder}
              stamps={stamps}
              misses={misses}
              score={timelineScore}
              feedback={timelineFeedbackText}
              isWarning={timelineStatus === 'wrong'}
              onBackToGames={() => showView('games', true, 'backward')}
              onSelectCard={handleSelectTimelineCard}
              onReset={resetTimeline}
            />
          )}

          {mode === 'quiz' && (
            <QuizGameView
              locale={locale}
              t={t}
              quiz={quizData}
              qIndex={qIndex}
              choice={choice}
              answered={answered}
              score={score}
              onBackToGames={() => showView('games', true, 'backward')}
              onStartQuizQuestions={handleStartQuizQuestions}
              onSelectChoice={setChoice}
              onCheckAnswer={handleCheckQuizAnswer}
              onNextQuizQuestion={handleNextQuizQuestion}
              onOpenRelatedTopic={handleOpenRelatedTopic}
            />
          )}

          <BottomRail
            mode={mode}
            locale={locale}
            t={t}
            onNavigate={(target) => showView(target)}
            onOpenExhibit={() => openTopic(5, mode === 'answer' ? 'switch' : 'forward')}
          />
        </div>
      </main>
    </>
  );
}
