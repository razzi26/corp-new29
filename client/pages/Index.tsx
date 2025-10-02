import { Check, HeartPulse, Microscope, Stethoscope, Scan, ShieldCheck } from "lucide-react";

export default function Index() {
  return (
    <div id="top" className="text-white">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 md:pt-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm backdrop-blur border border-white/20">
              <ShieldCheck className="h-4 w-4" /> Сертифицированное оборудование и официальная гарантия
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
              Продажа медицинского оборудования для клиник и бизнеса
            </h1>
            <p className="mt-4 text-white/85 text-base md:text-lg max-w-xl">
              Комплексные поставки, внедрение и сервисная поддержка. От кардиомониторов до лабораторной диагностики — под ключ и точно в срок.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#products" className="inline-flex items-center justify-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-5 py-3 font-semibold shadow hover:shadow-md transition">
                Смотреть каталог
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition">
                Получить консультацию
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/90 max-w-md">
              {[
                "Поставка и монтаж",
                "Обучение персонала",
                "Сервис и гарантия",
                "Индивидуальные решения",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-white" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-white/10 blur-2xl rounded-3xl" aria-hidden />
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                <FeatureCard icon={HeartPulse} title="Мониторы" />
                <FeatureCard icon={Microscope} title="Лаборатория" />
                <FeatureCard icon={Scan} title="Визуализация" />
                <FeatureCard icon={Stethoscope} title="Диагностика" />
                <FeatureCard icon={ShieldCheck} title="Стерилизация" />
                <FeatureCard icon={HeartPulse} title="Кардиология" />
              </div>
              <p className="mt-4 text-sm text-white/80">
                Подберём конфигурацию под ваши задачи и бюджет
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Benefits */}
      <section id="benefits" className="container mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard
            title="Экспертиза отрасли"
            descr="10+ лет опыта поставок для государственных и частных клиник"
          />
          <BenefitCard
            title="Официальные поставки"
            descr="Работаем только с сертифицированными производителями"
          />
          <BenefitCard
            title="Сервис по всей РФ"
            descr="Собственная сервисная служба и оперативная поддержка"
          />
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Популярные категории</h2>
          <a href="#contact" className="hidden md:inline-flex text-sm hover:underline">Нужна помощь с выбором?</a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard title="УЗИ сканеры" tag="В наличии" />
          <ProductCard title="Лабораторные анализаторы" tag="Под заказ" />
          <ProductCard title="Мониторы пациента" tag="Хит продаж" />
          <ProductCard title="Рентген и КТ" tag="Спец. предложение" />
          <ProductCard title="Эндоскопическое оборудование" tag="Новинка" />
          <ProductCard title="Стерилизационное оборудование" tag="В наличии" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 mt-20 mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Свяжитесь с нами</h3>
            <p className="mt-3 text-white/85 max-w-prose">
              Оставьте контакты — подготовим коммерческое предложение под ваши потребности, сроки и бюджет.
            </p>
            <ul className="mt-6 space-y-2 text-white/85 text-sm">
              <li>Тел.: +7 (495) 000-00-00</li>
              <li>Email: sales@meditech.pro</li>
              <li>Пн–Пт: 9:00–19:00</li>
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget as HTMLFormElement);
              console.log(Object.fromEntries(form.entries()));
              alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
            }}
            className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 md:p-8"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm">
                <span>Имя</span>
                <input name="name" required className="h-11 rounded-lg bg-white/90 text-slate-900 px-3 outline-none focus:ring-2 focus:ring-white" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Телефон или email</span>
                <input name="contact" required className="h-11 rounded-lg bg-white/90 text-slate-900 px-3 outline-none focus:ring-2 focus:ring-white" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Комментарий</span>
                <textarea name="message" rows={4} className="rounded-lg bg-white/90 text-slate-900 px-3 py-2 outline-none focus:ring-2 focus:ring-white" />
              </label>
              <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-5 py-3 font-semibold shadow hover:shadow-md transition">
                Отправить заявку
              </button>
              <p className="text-xs text-white/70">
                Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="aspect-square rounded-2xl border border-white/20 bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-4">
      <Icon className="h-8 w-8" />
      <span className="mt-2 text-sm">{title}</span>
    </div>
  );
}

function BenefitCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-white/85 text-sm leading-relaxed">{descr}</p>
    </div>
  );
}

function ProductCard({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur">
      <div className="relative h-40 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
        <span className="absolute top-3 left-3 text-xs rounded-full bg-white/90 text-[hsl(var(--brand-end))] px-2 py-1 font-semibold">{tag}</span>
      </div>
      <div className="p-5">
        <h4 className="font-semibold">{title}</h4>
        <p className="mt-1 text-sm text-white/80">Уточняйте наличие и стоимость у менеджера</p>
        <div className="mt-4 flex gap-2">
          <a href="#contact" className="inline-flex items-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-3 py-2 text-sm font-semibold shadow">
            Запросить КП
          </a>
          <a href="#contact" className="inline-flex items-center rounded-lg border border-white/30 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            Консультация
          </a>
        </div>
      </div>
    </div>
  );
}
