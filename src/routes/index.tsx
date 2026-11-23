import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Star, MapPin, Instagram } from "lucide-react";

import logo from "@/assets/logo-magia-das-flores.png";
import heroImg from "@/assets/arranjo-colorido.jpg";
import floresLoja from "@/assets/flores-na-loja.jpg";
import buqueRosas from "@/assets/buque-rosas.jpg";
import buqueGirassois from "@/assets/buque-girassois.jpg";
import buqueRosa from "@/assets/buque-rosas-claras.jpg";
import buqueAzul from "@/assets/buque-azul-e-amarelo.jpg";
import buqueVariado from "@/assets/buque-variado.jpg";
import buqueHortensias from "@/assets/buque-hortensias.jpg";
import buqueLirios from "@/assets/buque-lirios-e-rosas.jpg";
import arranjoPresente from "@/assets/arranjo-presente.jpg";

const WA = "https://wa.me/5547991280394";
const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
const MSG_MAIN = "Olá! Vim pelo site da Magia das Flores e gostaria de conhecer os arranjos disponíveis.";
const MSG_ITEM = "Olá! Gostaria de saber mais sobre este arranjo que vi no site da Magia das Flores.";
const INSTAGRAM = "https://www.instagram.com/_magiadasflores_/";
const MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("R. Hermann Weege, 1568, Ribeirão Areia, Pomerode, SC, 89107-000");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magia das Flores — Floricultura em Pomerode" },
      { name: "description", content: "Flores, buquês e arranjos da Magia das Flores em Pomerode, SC. Faça seu pedido pelo WhatsApp ou visite nossa floricultura." },
      { property: "og:title", content: "Magia das Flores — Cultivando o amor em Pomerode" },
      { property: "og:description", content: "Buquês, flores e presentes para transformar momentos. Encomende pelo WhatsApp ou visite a Magia das Flores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`block shrink-0 ${className}`} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

const gallery = [
  { src: buqueRosas, alt: "Buquê de rosas vermelhas e cor-de-rosa com flores brancas", pos: "object-center" },
  { src: floresLoja, alt: "Variedade de flores frescas expostas na floricultura", pos: "object-[50%_60%]" },
  { src: buqueGirassois, alt: "Buquê alegre de girassóis e flores cor-de-rosa", pos: "object-center" },
  { src: buqueRosa, alt: "Buquê delicado de rosas cor-de-rosa com presente", pos: "object-center" },
  { src: buqueAzul, alt: "Buquê de girassóis com flores azuis e laço azul", pos: "object-center" },
  { src: buqueVariado, alt: "Arranjo colorido de flores variadas para presentear", pos: "object-center" },
  { src: buqueHortensias, alt: "Buquê com hortênsia azul e flores em tons suaves", pos: "object-center" },
  { src: buqueLirios, alt: "Buquê de lírios cor-de-rosa com flores variadas", pos: "object-center" },
  { src: arranjoPresente, alt: "Arranjo de flores com pelúcia e flores coloridas", pos: "object-center" },
];

const desktopScatter = [
  { photo: gallery[0], position: { top: "4%", left: "6%" }, width: "13rem" },
  { photo: gallery[2], position: { top: "2%", right: "10%" }, width: "9rem" },
  { photo: gallery[4], position: { top: "38%", left: "-2%" }, width: "11rem" },
  { photo: gallery[3], position: { bottom: "4%", left: "18%" }, width: "10rem" },
  { photo: gallery[6], position: { bottom: "10%", right: "4%" }, width: "12rem" },
  { photo: gallery[1], position: { top: "42%", right: "-3%" }, width: "9rem" },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const galleryViewportRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = galleryScrollRef.current;
    const viewport = galleryViewportRef.current;
    const track = galleryTrackRef.current;
    if (!scrollArea || !viewport || !track) return;

    const desktop = window.matchMedia("(min-width: 1280px)");
    let frame = 0;

    const updateGallery = () => {
      if (desktop.matches) {
        scrollArea.style.height = "";
        track.style.transform = "";
        return;
      }

      const style = window.getComputedStyle(viewport);
      const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const contentWidth = viewport.clientWidth - horizontalPadding;
      const distance = Math.max(0, track.scrollWidth - contentWidth);
      scrollArea.style.height = `${viewport.offsetHeight + distance}px`;
      const progress = Math.min(1, Math.max(0, -scrollArea.getBoundingClientRect().top / Math.max(distance, 1)));
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateGallery();
      });
    };

    updateGallery();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktop.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktop.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const nav = [
    { href: "#arranjos", label: "Arranjos" },
    { href: "#como-pedir", label: "Como pedir" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-wine-deep">
        <img
          src={heroImg}
          alt="Arranjo de flores coloridas da Magia das Flores"
          fetchPriority="high"
          className="animate-slow-zoom absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%] md:object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-hero-veil" />

        <header className="relative z-20 flex items-center justify-between px-5 pt-5 md:px-12 md:pt-8">
          <a href="#" aria-label="Magia das Flores — início" className="block">
            <img src={logo} alt="Logotipo da Magia das Flores Floricultura" width={64} height={64} className="h-14 w-14 md:h-16 md:w-16" />
          </a>
          <nav className="hidden items-center gap-10 text-sm text-on-photo md:flex" aria-label="Principal">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="opacity-90 transition-opacity hover:opacity-100">{n.label}</a>
            ))}
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="border border-on-photo/60 px-5 py-2.5 transition-colors hover:bg-on-photo hover:text-wine">
              Fazer pedido
            </a>
          </nav>
          <button
            className="flex h-11 w-11 items-center justify-center text-on-photo md:hidden"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {menu && (
          <div className="absolute inset-0 z-10 flex flex-col justify-center gap-8 bg-wine-deep/95 px-8 animate-in fade-in md:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="font-display text-4xl text-on-photo">{n.label}</a>
            ))}
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-2 bg-crimson px-6 py-4 text-on-photo">
              <WhatsIcon className="h-5 w-5" /> Fazer meu pedido
            </a>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-12 md:pb-16">
          <div className="max-w-3xl text-on-photo">
            <p className="animate-rise text-sm tracking-wide text-on-photo/85" style={{ animationDelay: "300ms" }}>Floricultura em Pomerode, Santa Catarina</p>
            <h1 className="animate-rise mt-3 font-display text-[3.25rem] font-medium leading-[0.95] md:text-8xl" style={{ animationDelay: "450ms" }}>
              Flores que falam <em className="font-normal">por você.</em>
            </h1>
            <p className="animate-rise mt-5 max-w-md text-base leading-relaxed opacity-90 md:text-lg" style={{ animationDelay: "650ms" }}>
              Buquês e arranjos para presentear, celebrar e surpreender alguém especial.
            </p>
            <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" style={{ animationDelay: "850ms" }}>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-crimson px-7 py-4 font-medium text-on-photo transition-transform hover:-translate-y-0.5">
                <WhatsIcon className="h-5 w-5" /> Fazer meu pedido
              </a>
              <a href="#arranjos" className="inline-flex items-center justify-center py-3 underline decoration-on-photo/40 underline-offset-8 transition-colors hover:decoration-on-photo">
                Conhecer os arranjos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ARRANJOS */}
      <section id="arranjos" className="py-20 md:py-32 xl:py-0">
        <Reveal className="px-5 md:px-12 xl:hidden">
          <div className="grid gap-4 md:grid-cols-12 md:items-end">
            <h2 className="font-display text-4xl leading-[1.05] text-wine md:col-span-7 md:text-6xl">
              Um detalhe que transforma <em>qualquer momento.</em>
            </h2>
            <p className="max-w-sm text-muted-foreground md:col-span-4 md:col-start-9">
              Cada buquê é montado à mão. Gostou de algum? Toque e converse com a gente.
            </p>
          </div>
        </Reveal>

        <div ref={galleryScrollRef} className="relative mt-12 h-[210svh] md:mt-16 md:px-12 xl:hidden">
          <div ref={galleryViewportRef} className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 xl:static xl:block xl:h-auto xl:overflow-visible xl:px-0">
            <div ref={galleryTrackRef} className="flex w-max gap-4 will-change-transform xl:grid xl:w-full xl:grid-cols-12 xl:gap-6 xl:overflow-visible xl:will-change-auto">
              {gallery.map((g, i) => {
                const layout = [
                  "md:col-span-7",
                  "md:col-span-5 md:mt-24",
                  "md:col-span-4",
                  "md:col-span-4 md:mt-16",
                  "md:col-span-4 md:mt-6",
                  "md:col-span-5",
                  "md:col-span-7 md:mt-24",
                  "md:col-span-6",
                  "md:col-span-6 md:mt-20",
                ][i];
                const imageShape = [
                  "md:aspect-[4/3]",
                  "md:aspect-[3/4]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/3]",
                  "md:aspect-[4/5]",
                  "md:aspect-[4/5]",
                ][i];
                return (
                  <Reveal key={g.alt} delay={i * 120} className={`w-[78vw] shrink-0 sm:w-[55vw] xl:w-auto ${layout}`}>
                    <a href={waLink(MSG_ITEM)} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Consultar este arranjo: ${g.alt}`}>
                      <div className="overflow-hidden bg-ivory">
                        <img src={g.src} alt={g.alt} loading="lazy" className={`aspect-[3/4] w-full object-cover ${imageShape} ${g.pos} transition-transform duration-[1200ms] ease-out group-hover:scale-105`} />
                      </div>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-wine">
                        <span className="h-px w-6 bg-crimson transition-all duration-500 group-hover:w-10" />
                        Consultar este arranjo
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="relative grid min-h-[110svh] place-items-center overflow-hidden bg-background px-12 py-24">
            {desktopScatter.map((item) => (
              <img
                key={item.photo.alt}
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                className="absolute h-auto border-[0.4rem] border-background"
                style={{ ...item.position, width: item.width, boxShadow: "0 18px 40px -18px oklch(0.2 0.015 40 / 0.45)" }}
              />
            ))}
            <div className="relative z-10 grid max-w-[40rem] justify-items-center gap-5 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-crimson">Magia das Flores · Pomerode</p>
              <h2 className="font-display text-4xl leading-[1.05] text-wine 2xl:text-6xl">
                Um detalhe que transforma qualquer momento.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Buquês e arranjos feitos para presentear, celebrar e surpreender.
              </p>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-crimson px-6 py-4 font-medium text-on-photo transition-transform hover:-translate-y-0.5">
                <WhatsIcon className="h-5 w-5" /> Escolher meu arranjo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUE */}
      <section className="bg-wine text-on-photo">
        <div className="grid md:grid-cols-2">
          <Reveal className="h-full">
            <img src={buqueRosas} alt="Buquê de rosas vermelhas da Magia das Flores" loading="lazy" className="h-[75svh] w-full object-cover object-[50%_55%] md:h-full md:min-h-[720px]" />
          </Reveal>
          <div className="flex items-center px-6 py-16 md:px-16 lg:px-24">
            <Reveal>
              <p className="text-sm text-blush">Para cada ocasião</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
                Presentes que fazem <em>momentos especiais.</em>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed opacity-85">
                Flores que transformam momentos simples em experiências especiais. Escolha seu arranjo e fale com a nossa equipe.
              </p>
              <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 border border-on-photo/50 px-7 py-4 transition-colors hover:bg-on-photo hover:text-wine">
                <WhatsIcon className="h-5 w-5" /> Conversar com a floricultura
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMO PEDIR */}
      <section id="como-pedir" className="px-5 py-20 md:px-12 md:py-32">
        <Reveal>
          <h2 className="font-display text-4xl text-wine md:text-6xl">Como fazer seu pedido</h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {[
            ["Escolha o arranjo", "Veja os buquês acima ou fale com a gente sobre o que você imagina."],
            ["Converse pelo WhatsApp", "A equipe da Magia das Flores confirma a disponibilidade e combina os detalhes com você."],
            ["Retire ou receba", "Combine a retirada na floricultura ou consulte a entrega para sua região."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <li className="border-t border-border pt-6">
                <span className="font-display text-5xl italic text-crimson">{i + 1}</span>
                <h3 className="mt-3 text-lg font-medium text-foreground">{t}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14">
          <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-wine px-7 py-4 font-medium text-on-photo transition-colors hover:bg-crimson">
            <WhatsIcon className="h-5 w-5" /> Começar meu pedido
          </a>
        </Reveal>
      </section>

      {/* PROVA SOCIAL */}
      <section className="border-y border-border bg-ivory px-5 py-12 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl text-wine">4,8</span>
            <div>
              <div className="flex gap-0.5 text-crimson" aria-label="4,8 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} opacity={i === 4 ? 0.45 : 1} />)}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">80 avaliações no Google</p>
            </div>
          </div>
          <p className="max-w-md font-display text-xl italic text-foreground md:text-2xl">Cultivando o amor e criando experiências que ficam em Pomerode.</p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer id="contato" className="bg-wine-deep px-5 pb-28 pt-20 text-on-photo md:px-12 md:pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-5xl leading-none md:text-7xl">Vamos montar <em>o seu?</em></h2>
            <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex flex-nowrap items-center gap-2 whitespace-nowrap bg-crimson px-7 py-4 font-medium transition-transform hover:-translate-y-0.5">
              <WhatsIcon className="h-5 w-5" /> WhatsApp (47) 99128-0394
            </a>
            <a href="tel:+554733871425" className="mt-4 block w-fit text-sm underline underline-offset-4 opacity-85 hover:opacity-100">Ligar: (47) 3387-1425</a>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-2 md:col-span-6">
            <div>
              <p className="text-blush">Endereço</p>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-2 flex gap-2 leading-relaxed opacity-90 hover:opacity-100">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> R. Hermann Weege, 1568 — Ribeirão Areia, Pomerode, SC · 89107-000
              </a>
            </div>
            <div>
              <p className="text-blush">Atendimento</p>
              <p className="mt-2 leading-relaxed opacity-90">Visite a floricultura ou consulte a disponibilidade de entrega pelo WhatsApp.</p>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 opacity-90 hover:opacity-100">
                <Instagram className="h-4 w-4" /> @_magiadasflores_
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-on-photo/15 pt-8">
          <img src={logo} alt="Logotipo da Magia das Flores Floricultura" loading="lazy" className="h-20 w-20" />
          <p className="text-xs opacity-60">© {new Date().getFullYear()} Magia das Flores Floricultura</p>
        </div>
      </footer>

      <a href={waLink(MSG_MAIN)} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Magia das Flores no WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 flex-nowrap items-center justify-center overflow-hidden rounded-full bg-botanic text-on-photo shadow-lg transition-transform hover:scale-105">
        <WhatsIcon className="h-7 w-7" />
      </a>
    </main>
  );
}
