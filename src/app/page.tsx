import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { AboutTech } from "@/components/AboutTech";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* 500vh Sticky Scrollytelling Canvas + Parallax Text Overlay */}
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      {/* Interactive Work Showcase Section */}
      <Projects />

      {/* Technical Stack & Engineering Principles */}
      <AboutTech />

      {/* Footer with Contact CTA & Local Time */}
      <Footer />
    </main>
  );
}
