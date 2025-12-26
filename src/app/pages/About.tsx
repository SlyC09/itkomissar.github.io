import { withBase } from "../lib/withBase";

export function About() {
  return (
    <div className="space-y-14 lg:space-y-16">
      <header className="space-y-6 pb-10 border-b border-[#e6dfd2]">
        <img
          src={withBase("/images/avatar.png")}
          alt="Андрей Комиссаренко"
          className="w-[120px] h-[120px] rounded-full object-cover"
          loading="lazy"
        />

        <h1 className="text-[36px] sm:text-[52px] font-semibold leading-[1.05] text-[#0f0e0c]">
          Привет, я Андрей Комиссаренко
        </h1>

        <div className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9] max-w-[760px]">
          <a
            className="font-semibold text-[#6d28d9] hover:underline underline-offset-4"
            href="https://twitter.com/itkomissar"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <span className="text-[#9d9589]">, </span>
          <a
            className="font-semibold text-[#6d28d9] hover:underline underline-offset-4"
            href="https://threads.net/@itkomissar"
            target="_blank"
            rel="noreferrer"
          >
            Threads
          </a>
          <span className="text-[#9d9589]">, </span>
          <a
            className="font-semibold text-[#6d28d9] hover:underline underline-offset-4"
            href="https://linkedin.com/in/itkomissar/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <span className="text-[#9d9589]">. </span>
          <span>По вопросам — в личный Telegram: </span>
          <a
            className="font-semibold text-[#6d28d9] hover:underline underline-offset-4"
            href="https://t.me/itkomissar"
            target="_blank"
            rel="noreferrer"
          >
            @itkomissar
          </a>
        </div>
      </header>

      <section className="space-y-6 max-w-[760px]">
        <h2 className="text-[24px] sm:text-[30px] font-semibold leading-[1.2] text-[#0f0e0c]">
          Обо мне
        </h2>

        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9]">
          Соосновал и развиваю Plan4travel — продукт про планирование путешествий: от идеи поездки
          до маршрута, списка дел и полезных заметок.
        </p>

        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9]">
          Я PM и сооснователь: люблю запускать продукты “от проблемы до результата” — ресёрч,
          гипотезы, MVP, метрики, итерации. Хочу делать вещи, которые быстро приносят пользу людям,
          а не просто красиво “монетизируются”.
        </p>

        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9]">
          По образованию я юрист, поэтому пишу и думаю о праве в реальном мире продуктов: риски,
          договоры, ответственность, приватность — и как сделать так, чтобы всё это работало без
          боли.
        </p>

        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9]">
          Пишу про запуск продуктов, стартапы, личную эффективность и маркетинг — как находить
          спрос, формулировать ценность и доводить идеи до работающих решений.
        </p>

        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9]">
          Иногда пишу про философию и психологию — как мы принимаем решения, что нами движет, и
          почему “правильные” планы не всегда становятся действиями.
        </p>
      </section>
    </div>
  );
}
