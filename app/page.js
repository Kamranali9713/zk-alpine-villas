import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SETTINGS } from "@/lib/defaultSettings";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { About } from "@/components/About";
import { Properties } from "@/components/Properties";
import { Facilities } from "@/components/Facilities";
import { VideoTour } from "@/components/VideoTour";
import { PaymentPlan } from "@/components/PaymentPlan";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CeoSection } from "@/components/CeoSection";
import { Gallery } from "@/components/Gallery";
import { NocSection } from "@/components/NocSection";
import { LocationSection } from "@/components/LocationSection";
import { FAQSection } from "@/components/FAQSection";
import { InquiryForm } from "@/components/InquiryForm";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileContactBar } from "@/components/MobileContactBar";

export const revalidate = 0;

export default async function Home() {
  const supabase = createClient();

  const [{ data: settingsRow }, { data: properties }, { data: facilities }, { data: gallery }, { data: faqs }] =
    await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("properties").select("*").eq("is_active", true).order("sort_order"),
      supabase.from("facilities").select("*").order("sort_order"),
      supabase.from("gallery").select("*").order("sort_order"),
      supabase.from("faqs").select("*").order("sort_order"),
    ]);

  const settings = settingsRow ?? DEFAULT_SETTINGS;
  const villas = (properties ?? []).filter((p) => p.kind === "villa");
  const farmhouses = (properties ?? []).filter((p) => p.kind === "farmhouse");

  return (
    <>
      <Header />
      <main>
        <Hero settings={settings} />
        <Highlights />
        <About />
        <Properties
          id="villas"
          kind="villa"
          eyebrow="Villas"
          heading="Villa options at ZK Alpine Villas"
          intro="Purpose-built villa plots designed for permanent family living, with full access to on-site facilities."
          items={villas}
        />
        <Properties
          id="farmhouses"
          kind="farmhouse"
          eyebrow="Farmhouses"
          heading="Farmhouse options at ZK Alpine Villas"
          intro="Spacious farmhouse plots for a quieter pace, still close enough for easy access to the city."
          items={farmhouses}
          reverse
        />
        <Facilities items={facilities ?? []} />
        <VideoTour url={settings.tour_video_url} />
        <PaymentPlan settings={settings} />
        <WhyChooseUs />
        <CeoSection settings={settings} />
        <Gallery items={gallery ?? []} />
        <NocSection settings={settings} />
        <LocationSection settings={settings} />
        <FAQSection items={faqs ?? []} />
        <InquiryForm settings={settings} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton number={settings.whatsapp_number} />
      <MobileContactBar settings={settings} />
    </>
  );
}
