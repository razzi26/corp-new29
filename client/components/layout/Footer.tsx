export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/15 bg-black/10">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-white/80">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white font-bold">M</span>
            <span className="text-white font-semibold">MediTech Pro</span>
          </div>
          <p className="text-sm leading-relaxed">
            Современные решения для оснащения клиник, лабораторий и частных
            практик. Поставляем сертифицированное оборудование с гарантией и
            сервисом.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10">
          <div>
            <h4 className="text-white font-semibold mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white" href="#about">О нас</a></li>
              <li><a className="hover:text-white" href="#benefits">Преимущества</a></li>
              <li><a className="hover:text-white" href="#products">Каталог</a></li>
              <li><a className="hover:text-white" href="#contact">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>+7 (495) 000-00-00</li>
              <li>info@meditech.pro</li>
              <li>Пн–Пт: 9:00–19:00</li>
            </ul>
          </div>
        </div>
        <div className="text-sm md:text-right flex md:block flex-col justify-between">
          <p>© {new Date().getFullYear()} MediTech Pro</p>
          <p className="text-white/60">Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}
