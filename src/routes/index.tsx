import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { About } from "../components/portfolio/About";
import { Achievements } from "../components/portfolio/Achievements";
import { CommandPalette } from "../components/portfolio/CommandPalatte";
import { Contact } from "../components/portfolio/Contact";
import { Experience } from "../components/portfolio/Experience";
import { Hero } from "../components/portfolio/Hero";
import { Loader } from "../components/portfolio/Loader";
import { Nav } from "../components/portfolio/Nav";
import { Projects } from "../components/portfolio/Projects";
import { ScrollProgress } from "../components/portfolio/ScrollProgress";
import { Skills } from "../components/portfolio/Skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandra Sekhar Reddy — Full Stack Developer & Next.js Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Chandra Sekhar Reddy, Computer Science Engineering student and Full Stack Developer building scalable web apps with React, Next.js, Node.js, and modern technologies.",
      },
      {
        name: "keywords",
        content:
          "Full Stack Developer, React Developer, Next.js Developer, Frontend Developer, Software Developer, Computer Science Student, Web Developer Portfolio, Chandra Sekhar Reddy",
      },
      { property: "og:title", content: "Chandra Sekhar Reddy — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Premium portfolio: scalable full-stack applications, modern UX, and real-world digital products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Chandra Sekhar Reddy — Full Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Computer Science Engineering student crafting high-performance web applications.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
