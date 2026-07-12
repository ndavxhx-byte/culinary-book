import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1760445530191-55f1d7a8cfd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBidXJyYXRhJTIwdG9tYXRvZXMlMjBkaXNoJTIwcnVzdGljJTIwdGFibGV8ZW58MXx8fHwxNzgzODE4MDE4fDA&ixlib=rb-4.1.0&q=80&w=1400";

const recipes = [
  {
    title: "Паста с томатами и страчателлой",
    time: 25,
    tag: "Ужин за полчаса",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRvbWF0byUyMGJhc2lsJTIwYm93bCUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3ODM4MTgwMjJ8MA&ixlib=rb-4.1.0&q=80&w=720",
  },
  {
    title: "Сырники с малиной и сметаной",
    time: 35,
    tag: "Завтрак выходного дня",
    image: "https://images.unsplash.com/photo-1723112930259-76cac84b2189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdXNzaWFuJTIwc3lybmlraSUyMGJyZWFrZmFzdCUyMGZvb2QlMjBzdHlsaW5nfGVufDF8fHx8MTc4MzgxODAyMHww&ixlib=rb-4.1.0&q=80&w=720",
  },
  {
    title: "Лосось в зелёном масле",
    time: 40,
    tag: "Главное блюдо",
    image: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwdmVnZXRhYmxlcyUyMHBsYXRlJTIwZm9vZCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc4MzgxODAyNHww&ixlib=rb-4.1.0&q=80&w=720",
  },
];

const categories = ["Все рецепты", "Завтраки", "Супы", "Салаты", "Основные блюда", "Выпечка", "Десерты"];

export default function App() {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickOnly, setQuickOnly] = useState(false);

  const filteredRecipes = useMemo(() => {
    const term = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery = !term || recipe.title.toLowerCase().includes(term) || recipe.tag.toLowerCase().includes(term);
      return matchesQuery && (!quickOnly || recipe.time <= 30);
    });
  }, [query, quickOnly]);

  const toggleSave = (title: string) => {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background font-['Manrope'] text-foreground selection:bg-primary selection:text-white">
      <header className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between border-b border-border px-5 py-4 lg:px-10">
        <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex size-10 items-center justify-center rounded-full border border-border bg-white transition hover:border-primary hover:text-primary" aria-label="Открыть меню">
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
        <a href="#top" className="absolute left-1/2 -translate-x-1/2 text-[22px] font-extrabold tracking-[-0.06em] sm:text-[25px]">вкусно<span className="text-primary">.</span>дома</a>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden rounded-full border border-border px-4 py-2 text-xs font-bold transition hover:border-primary hover:text-primary sm:block">Войти</button>
          <button type="button" className="relative flex size-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-[#a92d26]" aria-label="Сохранённые рецепты">
            <Bookmark size={17} />
            {saved.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-extrabold text-accent-foreground">{saved.length}</span>}
          </button>
        </div>
      </header>

      {menuOpen && <div className="relative z-10 border-b border-border bg-white px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-7 gap-y-3 text-sm font-bold">{categories.map((category) => <a key={category} className="transition hover:text-primary" href="#recipes">{category}</a>)}</div></div>}

      <section id="top" className="mx-auto grid max-w-[1440px] border-b border-border lg:grid-cols-[minmax(0,1fr)_44%]">
        <div className="order-2 flex flex-col justify-between px-5 py-12 sm:px-10 lg:order-1 lg:min-h-[590px] lg:px-10 lg:py-16 xl:px-16">
          <div>
            <p className="mb-6 flex items-center gap-2 font-['DM_Mono'] text-[10px] font-medium uppercase tracking-[0.16em] text-primary"><span className="h-px w-7 bg-primary" />Вдохновение на каждый день</p>
            <h1 className="max-w-[680px] font-['Playfair_Display'] text-[48px] font-bold leading-[0.98] tracking-[-0.035em] text-[#211b18] sm:text-[68px] xl:text-[84px]">Готовим с настроением.</h1>
            <p className="mt-6 max-w-lg text-[16px] leading-7 text-muted-foreground sm:text-lg">Рецепты для тех, кто любит собирать близких за столом и находить удовольствие в простых продуктах.</p>
          </div>
          <div className="mt-10 max-w-xl">
            <label className="group flex items-center gap-3 border-b-2 border-[#2b2420] bg-white px-1 py-4 transition focus-within:border-primary" htmlFor="recipe-search">
              <Search size={21} className="text-primary" />
              <input id="recipe-search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#9b9088] sm:text-base" placeholder="Что будем готовить?" />
              <ArrowRight size={21} className="shrink-0 transition group-focus-within:translate-x-1" />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>Популярное:</span>{["паста", "пирог", "летний салат"].map((item) => <button type="button" onClick={() => setQuery(item)} key={item} className="rounded-full bg-secondary px-3 py-1.5 font-semibold text-secondary-foreground transition hover:bg-accent">{item}</button>)}</div>
          </div>
        </div>
        <div className="order-1 relative min-h-[400px] overflow-hidden bg-[#d8c9b8] lg:order-2 lg:min-h-[590px]">
          <img className="absolute inset-0 size-full object-cover object-center" src={heroImage} alt="Томаты, сыр и хлеб для летней трапезы" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-8 sm:left-8 sm:right-8">
            <p className="max-w-[220px] font-['Playfair_Display'] text-2xl font-bold leading-7">Вкус июля — томаты, много томатов</p>
            <button type="button" className="grid size-11 place-items-center rounded-full bg-white text-[#2b2420] transition hover:scale-105"><ArrowRight size={19} /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-5 py-10 sm:px-10 lg:px-16">
        <div className="mb-6 flex items-center justify-between"><p className="font-['DM_Mono'] text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Выберите настроение</p><ChevronDown size={16} className="text-muted-foreground" /></div>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">{categories.map((category, index) => <button type="button" key={category} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${index === 0 ? "bg-[#28221f] text-white" : "border border-border bg-white hover:border-primary hover:text-primary"}`}>{category}</button>)}</div>
      </section>

      <section id="recipes" className="mx-auto max-w-[1440px] px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="font-['DM_Mono'] text-[10px] font-medium uppercase tracking-[0.16em] text-primary">Проверено редакцией</p><h2 className="mt-3 font-['Playfair_Display'] text-[39px] font-bold leading-none tracking-[-0.03em] sm:text-[52px]">Сегодня приготовим</h2></div>
          <button type="button" onClick={() => setQuickOnly((value) => !value)} className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${quickOnly ? "border-primary bg-primary text-white" : "border-border bg-white hover:border-primary"}`}><Clock3 size={15} />До 30 минут</button>
        </div>
        {filteredRecipes.length ? <div className="grid gap-8 md:grid-cols-3">{filteredRecipes.map((recipe, index) => <article key={recipe.title} className={index === 0 ? "md:col-span-2" : ""}>
          <div className={`group relative overflow-hidden rounded-[18px] bg-secondary ${index === 0 ? "aspect-[1.55/1]" : "aspect-[1/1.08]"}`}>
            <img src={recipe.image} alt={recipe.title} loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
            <button type="button" onClick={() => toggleSave(recipe.title)} className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full transition ${saved.includes(recipe.title) ? "bg-primary text-white" : "bg-white/90 text-[#302723] hover:bg-white"}`} aria-label={`Сохранить рецепт ${recipe.title}`}><Heart size={17} fill={saved.includes(recipe.title) ? "currentColor" : "none"} /></button>
            <div className="absolute bottom-5 left-5 right-5 text-white"><p className="mb-2 font-['DM_Mono'] text-[9px] uppercase tracking-[0.12em] opacity-85">{recipe.tag} · {recipe.time} мин</p><h3 className={`${index === 0 ? "text-2xl sm:text-3xl" : "text-xl"} font-['Playfair_Display'] font-bold leading-[1.05]`}>{recipe.title}</h3></div>
          </div>
        </article>)}</div> : <div className="grid min-h-56 place-items-center rounded-[18px] bg-secondary text-center"><div><Sparkles className="mx-auto mb-3 text-primary" /><p className="font-['Playfair_Display'] text-2xl font-bold">Ничего не нашли</p><button type="button" onClick={() => { setQuery(""); setQuickOnly(false); }} className="mt-3 text-sm font-bold text-primary underline underline-offset-4">Сбросить фильтры</button></div></div>}
      </section>

      <section className="bg-[#29211e] px-5 py-14 text-[#fffaf2] sm:px-10 lg:px-16 lg:py-20"><div className="mx-auto grid max-w-[1312px] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#e9b94d]">Кулинарное письмо</p><h2 className="mt-4 max-w-2xl font-['Playfair_Display'] text-[39px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[52px]">Идеи для вкусной недели — в вашем почтовом ящике.</h2></div><form onSubmit={(event) => event.preventDefault()} className="flex border-b border-white/50 pb-3"><input className="w-full bg-transparent text-sm outline-none placeholder:text-white/55" placeholder="ваш@email.ru" type="email" /><button type="submit" className="flex items-center gap-2 text-sm font-extrabold text-[#e9b94d]">Подписаться <ArrowRight size={17} /></button></form></div></section>

      <footer className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-5 py-7 text-xs font-semibold text-muted-foreground sm:flex-row sm:px-10 lg:px-16"><p>© 2025 вкусно.дома — готовим с любовью</p><div className="flex gap-5"><a href="#top" className="hover:text-primary">О проекте</a><a href="#recipes" className="hover:text-primary">Рецепты</a><a href="#top" className="hover:text-primary">Контакты</a></div></footer>
    </main>
  );
}
